import { Application, NextFunction, Request, Response } from "express";
import express from "express";
import http, { Server } from "http";
import { ResponseMethod } from "./types/public.types";
import "./types/app.module";
import "./modules/mongooseDB";
import IndexRoutes from "./routes/index.routes";

const app: Application = express();
const server: Server = http.createServer(app);
const PORT = 4444;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(IndexRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
  const response: ResponseMethod = {
    statusCode: 404,
    message: "صفحه یا آدرس مورد نظر یافت نشد",
  };
  return res.status(404).json(response);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = +error?.status || 500
  const message:string = error?.message || "internalServerError"
  const response: ResponseMethod = {
      statusCode,
      message, 
  }
  return res.status(statusCode).json(response)
})

server.listen(PORT, () => {
  console.log(`server run on => http://127.0.0.1:${PORT}`);
});
