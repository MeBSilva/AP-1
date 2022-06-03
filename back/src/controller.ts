import { Request, Response, NextFunction } from "express";
import { clean, update } from "./persist";
import { HttpError } from "./utils/HttpError";

const filterRepeatedItems = (array: Array<any>, itemsToRemove: Array<any>) => {
  return (array = array.filter((item) => {
    return itemsToRemove.indexOf(item) === -1;
  }));
};

const getUniqueMinimal = (array: Array<any>) => {
  if (array.length < 1) return;

  let uniqueArr: number[] = [];
  let repeatedArr: number[] = [];
  let min: number | undefined = undefined;

  for (const item of array) {
    if (uniqueArr.includes(item)) {
      repeatedArr.push(item);
    }
    uniqueArr.push(item);
  }
  uniqueArr = filterRepeatedItems(uniqueArr, repeatedArr);
  min = Math.min(...uniqueArr);

  return min;
};

export const cleanController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await clean();
  } catch (err) {
    return next(new HttpError(500, (err as Error).message));
  }

  res.status(200).json({
    message: "Success",
  });
};

export const submitController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let unique: number | undefined | string;

  try {
    const result = await update(req.body.number);

    unique = getUniqueMinimal(result);

    if (typeof unique !== "number" || unique === Infinity) {
      unique = "Não existe valor único nos valores enviados.";
    }
  } catch (err) {
    return next(new HttpError(500, (err as Error).message));
  }

  res.status(200).json({
    message: "Success",
    unique: unique,
  });
};
