// routes/index.ts
import { Router } from "express";
import fileRoutes from "./fileRoute";
import userRouter from "./user-routes";

const appRoutes = Router();

appRoutes.use("/file", fileRoutes);
appRoutes.use("/auth", userRouter);

appRoutes.get("/", (req, res) => {
  res.send("hello");
});

export default appRoutes;
