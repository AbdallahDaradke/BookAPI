import express from "express";
import dotenv from "dotenv";
import pgclient from "../db.js";

const router = express.Router();

// const products = {};

router.get("/", async (req, res) => {
  const products = await pgclient.query("SELECT * FROM books;");
  res.json(products.rows);
});

router.get("/:id", async (req, res) => {
  const products = await pgclient.query("SELECT * FROM books Where id = $1;", [
    req.params.id,
  ]);
  res.json(products.rows[0]);
});

router.post("/", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const newProduct = await pgclient.query(
    "INSERT INTO books (title,author,year) VALUES ($1,$2,$3) RETURNING * ",
    [title, author, year]
  );

  res.json(newProduct.rows);
});

router.put("/:id", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;

  const UpdatedBook = await pgclient.query(
    "UPDATE books SET title=$1, author=$2, year=$3;",
    [title, author, year]
  );

  res.json(UpdatedBook.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await pgclient.query("DELETE FROM books Where id=$1", [req.params.id]);
});

export default router;
