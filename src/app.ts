import express, { Application } from "express";
import cors from "cors";
export const app: Application = express();
import router from "./app/routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/global.error";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use(globalErrorHandler);
//Not Found
app.use(notFound);
