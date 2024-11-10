import { createSelector } from "@reduxjs/toolkit";
import { booksState } from "./slice";
import { bookSmall } from "../../../types";

export const selectBooksFinished = createSelector(
  [booksState],
  (books: bookSmall[]) => {
        return books.filter((book) => book.status === 'Finished'); 
  }
);

export const selectBooksReading = createSelector(
    [booksState],
    (books: bookSmall[]) => {
          return books.filter((book) => book.status === 'Reading'); 
    }
  );

export const selectBooksWantToRead = createSelector(
    [booksState],
    (books: bookSmall[]) => {
          return books.filter((book) => book.status === 'WantToRead'); 
    }
  );

export const selectAllBooks = createSelector(
      [booksState],
      (books: bookSmall[]) => {return books}
    );