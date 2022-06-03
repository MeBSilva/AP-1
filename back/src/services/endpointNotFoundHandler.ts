import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/HttpError";

export const endpointNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new HttpError(
    404,
    `Erro 404: O endpoint ${req.originalUrl} não foi encontrado.`
  );

  next(error);
};
