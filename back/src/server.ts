import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "..", "..", ".env") });

import app from "./app";
import { port } from "./constants/port";

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
