import { createSelector } from "@reduxjs/toolkit";
import { booksState, messageState, currentBookState } from "./slice";
import { bookSmall, bookExpanded } from "../../../types";

export const selectBooksFinished = createSelector(
  [booksState],
  (books: bookSmall[]) => {
    return books.filter((book) => book.status === "Finished");
  }
);

export const selectBooksReading = createSelector(
  [booksState],
  (books: bookSmall[]) => {
    return books.filter((book) => book.status === "Reading");
  }
);

export const selectBooksWantToRead = createSelector(
  [booksState],
  (books: bookSmall[]) => {
    return books.filter((book) => book.status === "WantToRead");
  }
);

export const selectAllBooks = createSelector(
  [booksState],
  (books: bookSmall[]) => {
    return books;
  }
);

export const selectMessage = createSelector(
  [messageState],
  (message: string) => {
    return message;
  }
);

export const selectCurrentBook = createSelector(
  [currentBookState],
  (currentBook: bookExpanded) => {
    return currentBook;
  }
);
