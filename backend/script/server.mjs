// import  express from 'express';
// import cors from 'cors';
// import * as schema from './schema.mjs';
// export const app = express();
// const port = 4000;

// let what = {"nothing is fine" : "yeah"}
// app.use(cors());
// app.get('/',(req,res)=>{
//     res.send("Nothing has been");
// })
// app.get('/create',(req,res)=>{
//     res.send("hello");
// })
// app.post('/create',(req,res)=>{
//     res.writeHead(200, { "Content-type": "text/html" });
//     let clientData = [];
//     req.on("data", (clientDataPieces) => {
//         clientData.push(clientDataPieces);
//     });
//     req.on("end", () => {
//         let data = Buffer.concat(clientData).toString();
//         console.log(data);
//         let ob = JSON.parse(data);
//         if (req.url === '/create') {
//             let getData = async () => {
//                 console.log("data:",ob.title);
//             }
//             getData();
//             //mongodb
//             const note = new schema.Notes({
//                 title : `${ob.title}`,
//                 content : `${ob.content}`
//             });
//             note.save().then(()=> {
//                 console.log('data added to mongoDB');
//             })
//             let id= '642d4b29db8cdac4fb159839';
//             console.log(schema.Notes.findById(id).exec());
            
//         } 
//     })
//     res.end();
// })


// app.listen(port,()=>{
//     console.log('server started!');
// })

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

