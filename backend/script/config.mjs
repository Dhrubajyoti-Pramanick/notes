import mongoose from "mongoose";
import * as data from './password.mjs';
const url = `mongodb+srv://${data.data.name}:${data.data.passwrd}@cluster0.ftljdlo.mongodb.net/?retryWrites=true&w=majority`;

export async function connection() {
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("Connected to MongoDb");
    })
    .catch((err) => {
      console.error(err);
    });
}