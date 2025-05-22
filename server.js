import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pgclient from "./db.js";
import booksRouter from "./routes/book.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//
app.use("/api/books", booksRouter);

const PORT = process.env.PORT;
pgclient.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
  });
});
