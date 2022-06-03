import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:3000/api/" });

api.interceptors.request.use(
  (config) => config,
  (err) => {
    console.log("err", err);

    throw err;
  }
);

api.interceptors.response.use(
  (config) => config,
  (err) => {
    if (axios.isAxiosError(err)) {
      if (err.request) console.log(err.request);

      if (err.response) console.log(err.response.data);
    }

    throw err;
  }
);
