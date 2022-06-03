require("dotenv").config();
import express, { ErrorRequestHandler, json, Router } from "express";
import cors from "cors";

import { endpointNotFoundHandler } from "./services/endpointNotFoundHandler";
import { mainErrorHandler } from "./services/mainErrorHandler";
import { clean, submit } from "./routes";
import path from "path";

//Routes

const app = express();

//Middleware
app.use(json({ limit: "50mb" }));
app.use(cors());

//App routing
const router = Router();

app.use("/api", clean(router));
app.use("/api", submit(router));

//Client Serving

app.use(express.static(path.join(__dirname, "../../front/build")));

//404 handler
app.use((req, res, next) => endpointNotFoundHandler(req, res, next));

//Main error handler
const errorHandler: ErrorRequestHandler = (error, req, res, next) =>
  mainErrorHandler(error, req, res, next);

app.use(errorHandler);

export default app;
