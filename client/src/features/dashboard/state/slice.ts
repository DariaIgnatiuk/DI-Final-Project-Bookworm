import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExplicitAppState } from "../../../app/store";
import { bookSmall, bookExpanded, emptyBookExpanded, bookSmallEmpty } from "../../../types";

export type BooksReducerState = {
  books: bookSmall[];
  message: string;
  currentBook: bookExpanded;
};

const initialState: BooksReducerState = {
  books: [bookSmallEmpty],
  message: "",
  currentBook: emptyBookExpanded,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<bookSmall[]>) => {
      const currentBooks = action.payload;
      currentBooks.reverse();
      state.books = currentBooks;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setCurrentBook: (state, action: PayloadAction<bookExpanded>) => {
      state.currentBook = action.payload;
    },
  },
});

export const booksState = (state: ExplicitAppState) => state.booksReducer.books;
export const messageState = (state: ExplicitAppState) =>
  state.booksReducer.message;
export const currentBookState = (state: ExplicitAppState) =>
  state.booksReducer.currentBook;

export const { setBooks, setMessage, setCurrentBook } = booksSlice.actions;
export default booksSlice.reducer;
