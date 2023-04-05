// import * as mongoose from 'mongoose';
// const Schema = mongoose.Schema;
// const mongoDB = 'mongodb+srv://Dhrubajyoti:dhruba29@cluster0.ftljdlo.mongodb.net/?retryWrites=true&w=majority';
// let conn;
// main().catch(err => console.log(err));
// async function main() {
//     conn = await mongoose.connect(mongoDB);
//     console.log("connected!!");
// }
// const NoteSchema = Schema({
//     title : String,
//     content : String
// })

// export const Notes = mongoose.model('Notes', NoteSchema);

import mongoose from "mongoose";

const url = "mongodb+srv://Dhrubajyoti:dhruba29@cluster0.ftljdlo.mongodb.net/?retryWrites=true&w=majority";

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