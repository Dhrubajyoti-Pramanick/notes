import express from "express";
import cors from "cors";
import routes from "./routes.mjs";
import { connection } from "./config.mjs";

const app = express();

const PORT = 4000;

// parse json request body
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening in ${PORT}`);
});

connection();

