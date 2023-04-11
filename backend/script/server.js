import express, { response } from "express";
import cors from "cors";
import routes from "./routes.js";
import {connection} from "./connection.js";
import { port } from './config.js';

const app = express();

// parse json request body
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.use((req, res, next) => {
  next(new Error("page not found"));
});

app.use((error, req, res, next)=>{
  if(error) {
    res.status(400).send({
      success : false,
      message: error.message,
      data : null,
    });
  }
})
app.listen(port, () => {
  console.log(`Listening in ${port}`);
});

connection();