import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "../Blue Light Blue Color Blocks Flight Attendant CV.pdf";
import { PDFDocument } from "pdf-lib";
import axios from "axios";
import toast from "react-hot-toast/headless";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContect";
import { fetchFileData } from "../helpers/api-communication";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type SelectedPages = Record<number, boolean>;
function PdfLoader() {
  const navigate = useNavigate();
  const { fileId } = useParams<{ fileId: string }>();
  const auth = useAuth();
  const userId = auth?.user?.id;

  const [numPages, setNumPages] = useState<number>();
  const [selectedPages, setSelectedPages] = useState<SelectedPages>({});
  const [_newPdfGenerated, setNewPdfGenerated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getFile = async (userId: string, fileId: string) => {
      if (userId && fileId) {
        const res = fetchFileData(userId, fileId);
        const { pdf } = (await res).data;
        setUrl(pdf);
      }
    };

    getFile(userId!, fileId!);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);

    setSelectedPages(
      Array.from(
        { length: numPages },
        (_, index) => index + 1
      ).reduce<SelectedPages>((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {})
    );
  }

  const getPageWidth = () => {
    if (windowWidth < 600) {
      return windowWidth - 40;
    } else if (windowWidth >= 600 && windowWidth < 900) {
      return windowWidth - 80;
    } else {
      return 500;
    }
  };

  const togglePageSelection = (pageNumber: number) => {
    setSelectedPages((prevSelected) => ({
      ...prevSelected,
      [pageNumber]: !prevSelected[pageNumber],
    }));
  };

  const createNewPDF = async () => {
    setLoading(true);
    const selectedPagesArray = Object.entries(selectedPages)
      .filter(([_, isSelected]) => isSelected)
      .map(([pageNumber]) => Number(pageNumber));

    try {
      toast.loading("Creating New Pdf", {
        id: "create",
      });
      const existingPdfBytes = await axios.get(pdf, {
        responseType: "arraybuffer",
      });
      const existingPdfDoc = await PDFDocument.load(existingPdfBytes.data);
      const newPdfDoc = await PDFDocument.create();

      for (const selectedPage of selectedPagesArray) {
        const [copiedPage] = await newPdfDoc.copyPages(existingPdfDoc, [
          selectedPage - 1,
        ]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });

      const formData = new FormData();
      formData.append("file", blob, title);

      formData.append("title", title);

      await axios.post(
        `http://localhost:8080/api/v1/user/file/create/${userId}/${fileId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("File Uploaded Successfully", { id: "create" });

      setLoading(false);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setNewPdfGenerated(true);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Cant Create File", { id: "create" });
      console.error("Error generating new PDF:", error);
      setLoading(false);
    }
  };

  const path = `http://localhost:8080/${url}`;
  return (
    <>
      <Helmet>
        <title>{`PDF-Msater/${userId}/${url}`}</title>
      </Helmet>
      <div className="flex items-center justify-center bg-gray-400">
        <div className="mx-auto mt-9 mb-10">
          <div className="max-w-full overflow-x-auto mt-0">
            <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(numPages))
                .map((_x, i) => i + 1)
                .map((page, index) => (
                  <div
                    className="mt-7"
                    key={index}
                    style={{ maxWidth: "100%" }}
                  >
                    <label key={index} style={{ display: "block" }}>
                      <span className="w-full flex justify-between">
                        <span></span>
                        <span>
                          {page} / {numPages}
                          <input
                            type="checkbox"
                            checked={selectedPages[page]}
                            onChange={() => togglePageSelection(page)}
                            className="m-3"
                          />
                        </span>
                      </span>
                    </label>
                    <Page
                      key={page}
                      renderMode="canvas"
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      width={getPageWidth()}
                    />
                  </div>
                ))}
            </Document>
          </div>
        </div>
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center ">Create new One!</h3>
            <input
              type="text"
              placeholder="Name for new File"
              className="input input-bordered w-full mx-auto mt-3"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="modal-action">
              <button
                onClick={createNewPDF}
                className="btn bg-blue-500 hover:bg-blue-600 text-white"
                disabled={
                  Object.values(selectedPages).filter(Boolean).length === 0 ||
                  loading
                }
              >
                {loading ? "Generating..." : "Create"}
              </button>
              <a href="#" className="btn">
                Close
              </a>
            </div>
          </div>
        </div>
        <div className="fixed bottom-8">
          <a
            href="#my_modal_8"
            className="btn bg-yellow-300 shadow-lg border-2 hover:border-white hover:border-2 hover:bg-yellow-400 border-white text-black"
          >
            Generate New PDF
          </a>
        </div>
      </div>
    </>
  );
}

export default PdfLoader;
