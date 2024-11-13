const { Router } = require("express");
const bookController = require("../controllers/bookController.js");

const router = Router();

// get books from DB
router.post("/allbooks", bookController.getAllBooks);
router.post("/allbooks/:status", bookController.getBooksByStatus);
router.get("/book/:id", bookController.getBookById);
// get books from API
router.post("/search", bookController.searchBooks);
router.get("/search/:id", bookController.searchBookById);
// add books to DB
router.post("/add", bookController.addBook);
// remove books from DB
router.delete("/remove/:id", bookController.removeBook);
// edit books
router.put("/edit/:id", bookController.editBook);

module.exports = router;
