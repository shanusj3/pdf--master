import express, { Request } from "express";
import "dotenv/config";
import cors, { CorsOptions } from "cors";
import appRoutes from "./routes";

const app = express();

const allowedOrigins: string[] = [
  "https://my-pdf-master.vercel.app",
  "http://localhost:5173",
];

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/files", express.static("files"));
app.use(express.json());

// Routes
app.use("/api/v1/user", appRoutes);

export default app;
