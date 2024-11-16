const bookModel = require("../models/bookModel.js");
require("dotenv").config();
const { compressBooks, compressSingleBook } = require("../utils/bookUtils.js");

module.exports = {
  // get all books of the user from the DB
  getAllBooks: async (req, res) => {
    const { user_id } = req.body;
    try {
      const books = await bookModel.getAllBooksByUserId(user_id);
      res.status(201).json(books);
    } catch (error) {
      console.log(error);
    }
  },

  // get all the books of the user with a certain status from the DB
  getBooksByStatus: async (req, res) => {
    const { user_id, status } = req.body;
    try {
      const books = await bookModel.getBooksByStatus(user_id, status);
      res.status(201).json(books);
    } catch (error) {
      console.log(error);
    }
  },

  // get a single book of the user from the DB
  getBookById: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await bookModel.getBookById(id);
      if (book) res.status(200).json(book);
      else res.status(404).json({ message: "Book not found" });
    } catch (error) {
      console.log(error);
    }
  },

  // search for books matching the search criteria in Google Books API
  searchBooks: async (req, res) => {
    const { title, authors } = req.body;
    try {
      const books = await bookModel.searchBooks(title, authors);
      if (books.totalItems != 0) {
        const result = compressBooks(books);
        if (books) res.status(200).json(result);
      } else
        res
          .status(404)
          .json({
            message:
              "Couldn't find any books matching your request. Please change your request",
          });
    } catch (error) {
      console.log(error);
    }
  },

  // search for a book matching the with certain id in Google books API
  searchBookById: async (req, res) => {
    const id = req.params.id;
    try {
      const book = await bookModel.searchBookById(id);
      console.log(book);
      
      if (book) res.status(200).json(compressSingleBook(book));
      // else if res.status(400) res.status(400).json({ message: "Book not found" });
      else res.status(404).json({ message: "Book not found" });
    } catch (error) {
      console.log(error);
    }
  },

  // add a new book to the user's collection in the DB
  addBook: async (req, res) => {
    const {
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
    } = req.body;
    try {
      const book = await bookModel.addBook(
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
      );
      res.status(201).json("Book added successfully!");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  // remove a book from the user's collection in the DB
  removeBook: async (req, res) => {
    const id = req.params.id;
    try {
      await bookModel.removeBook(id);
      res.status(200).json(`Book was removed successfully!`);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  editBook: async (req, res) => {
    const {
      booktype,
      date_finish,
      date_start,
      pagecount,
      pagetype,
      reading_progress,
      score,
      status,
    } = req.body;
    const id = req.params.id;
    try {
      const book = await bookModel.editBook(
        id,
        booktype,
        date_finish,
        date_start,
        pagecount,
        pagetype,
        reading_progress,
        score,
        status
      );
      res
        .status(201)
        .json({ message: `Changes were saved successfully!`, book: book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  editBookScore: async (req, res) => {
    const {
      score,
    } = req.body;
    const id = req.params.id;
    try {
      const book = await bookModel.editBookScore(
        id,
        score
      );
      res
        .status(201)
        .json({ message: `Changes were saved successfully!`, book: book });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
};
