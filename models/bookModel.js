const { db } = require("../config/db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

module.exports = {
  getAllBooksByUserId: async (user_id) => {
    try {
      const books = await db("books")
        .select("id", "title", "authors", "image", "status", "reading_progress")
        .where({ user_id: user_id })
        .orderBy("id");
      return books;
    } catch (error) {
      throw error;
    }
  },
  getBooksByStatus: async (user_id, status) => {
    try {
      const books = await db("books")
        .select("id", "title", "authors", "image", "status", "reading_progress", "pagecount", "score")
        .where({ user_id: user_id, status: status });
      return books;
    } catch (error) {
      throw error;
    }
  },
  getBookById: async (id) => {
    try {
      const book = await db("books")
        .select(
          "id",
          "title",
          "authors",
          "publisher",
          "description",
          "image",
          "categories",
          "language",
          "booktype",
          "pagetype",
          "pagecount",
          "status",
          "reading_progress",
          "date_start",
          "date_finish",
          "score"
        )
        .where({ id: id })
        .first();
      return book;
    } catch (error) {
      throw error;
    }
  },
  searchBooks: async (title, authors) => {
    try {
      const books = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${authors}&maxResults=40&key=${API_KEY}`

      );
      return books.data;
    } catch (error) {
      throw error;
    }
  },
  searchBookById: async (id) => {
    try {
      const book = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      return book.data;
    } catch (error) {
      throw error;
    }
  },
  // add a book to the DB
  addBook: async (
    authors,
    booktype,
    categories,
    date_finish,
    date_start,
    description,
    image,
    language,
    pagecount,
    pagetype,
    publisher,
    reading_progress,
    score,
    status,
    title,
    user_id
  ) => {
    const trx = await db.transaction();
    try {
      const [book] = await trx("books").insert(
        {
          authors,
          booktype,
          categories,
          date_finish,
          date_start,
          description,
          image,
          language,
          pagecount,
          pagetype,
          publisher,
          reading_progress,
          score,
          status,
          title,
          user_id,
        },
        ["id"]
      );
      await trx.commit();
      return book;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  // remove a book from the DB
  removeBook: async (id) => {
    const trx = await db.transaction();
    try {
      await trx("books").where({ id: id }).del();
      await trx.commit();
      return { message: "Book removed successfully" };
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  editBook: async (
    id,
    booktype,
    date_finish,
    date_start,
    pagecount,
    pagetype,
    reading_progress,
    score,
    status
  ) => {
    const trx = await db.transaction();
    try {
      const updatedBook = await trx("books").where({ id: id }).update(
        {
          booktype,
          date_finish,
          date_start,
          pagecount,
          pagetype,
          reading_progress,
          score,
          status,
        },

        ["*"]
      );
      await trx.commit();
      return updatedBook;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  editBookScore: async (
    id,
    score,
  ) => {
    const trx = await db.transaction();
    try {
      const updatedBook = await trx("books").where({ id: id }).update(
        {
          score,
        },

        ["id"]
      );
      await trx.commit();
      return updatedBook;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
};
