import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const path = join(__dirname, "data/data.txt");

export const save = async (data?: any) => {
  await writeFile(path, data);
};

export const read = async () => {
  let file = undefined;
  try {
    file = await readFile(path, { encoding: "utf-8" });

    return file;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(error.message);
    return file;
  }
};

const isArray = (obj: any): obj is Array<any> => {
  return !!((obj as Array<any>).push !== undefined);
};

export const update = async (data: any): Promise<Array<any>> => {
  let persistedData = await read();
  let persistArray = [];

  if (!persistedData) {
    persistArray.push(data);

    await save(JSON.stringify(persistArray));
    return persistArray;
  }

  try {
    persistArray = JSON.parse(persistedData);
    if (isArray(persistArray)) {
      persistArray.push(data);
      await save(JSON.stringify(persistArray));

      return persistArray;
    }

    throw new Error("Invalid data file.");
  } catch (err) {
    throw new Error(
      "There was a problem updating the file, try clean command."
    );
  }
};

export const clean = async () => {
  await save("");
};
