import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContect";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddPdf: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const userId = auth?.user?.id;

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId || "");

      try {
        toast.loading("Uploading", { id: "Upload" });
        const response = await axios.post(
          `http://localhost:8080/api/v1/user/file/upload/${userId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const { uploadedPdfId } = response.data;

        console.log("File uploaded successfully!", response);
        toast.success("Upload Successfully", { id: "Upload" });
        if (response.data) {
          navigate(`/upload/${uploadedPdfId}`);
        }
      } catch (error) {
        toast.error("Unable to Upload", { id: "Upload" });
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex w-full  justify-center bg-grey-lighter">
        <label className="w-64 mt-7 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-slate-600">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept=".pdf"
          />
        </label>
      </div>
    </div>
  );
};

export default AddPdf;
