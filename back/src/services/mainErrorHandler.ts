import { NextFunction, Request, Response } from "express";

import { HttpError } from "../utils/HttpError";

const isHttpError = (error: unknown): error is HttpError =>
  (error as HttpError).code !== undefined &&
  (error as HttpError).message !== undefined &&
  (error as HttpError).toJSON !== undefined;

export const mainErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }

  if (isHttpError(err)) {
    res.status(err.code);

    res.json({
      message: err.message,
    });

    return;
  }
  res.status(500);

  res.json({
    message: "API Error.",
  });
};
