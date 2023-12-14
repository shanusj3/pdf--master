import { useEffect, useState } from "react";
import AddPdf from "../components/AddPdf";
import { useAuth } from "../context/AuthContect";
import { getAllFiles } from "../helpers/api-communication";
import { FileType } from "../types/FileTypes";
import { IoMdDownload } from "react-icons/io";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const auth = useAuth();
  const userId = auth?.user?.id;

  useEffect(() => {
    const getAllUserFiles = async (userId: string) => {
      try {
        const data = await getAllFiles(userId);
        const { uploadedFiles } = data;
        setFiles(uploadedFiles.reverse());
      } catch (error) {
        console.error("Error fetching user files:", error);
      }
    };

    if (userId) {
      getAllUserFiles(userId);
    }
  }, [userId]);

  const handleDownload = (pdfPath: string, filename: string) => {
    const pdfUrl = `http://localhost:8080/${pdfPath}`;

    const xhr = new XMLHttpRequest();
    xhr.open("GET", pdfUrl, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], { type: "application/pdf" });
        const blobUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = blobUrl;
        anchor.download = filename;
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
      } else {
        console.error("Failed to fetch the file:", xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.error("Network error occurred");
    };

    xhr.send();
  };

  return (
    <>
      <Helmet>
        <title>{`PDF-Msater/${userId}`}</title>
      </Helmet>
      <div className="w-full">
        <AddPdf />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 w-screen container mx-auto p-2">
          {files.map((value) => (
            <div
              key={value._id}
              className="mt-6 h-32 md:h-24 px-4 bg-blue-100 shadow-lg text-gray-600 rounded-md flex items-center justify-between"
            >
              <h1>{value.title}</h1>
              <span
                className="cursor-pointer"
                onClick={() => handleDownload(value.pdf, value.title)}
              >
                {" "}
                <IoMdDownload />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
