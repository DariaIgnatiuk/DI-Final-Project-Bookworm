import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExplicitAppState } from "../../../app/store"
import { bookSmall } from "../../../types";

export type BooksReducerState = {
    books: bookSmall[];
  };

const initialState: BooksReducerState = {
    books: [{
        id: 0,
        title: '', 
        authors: '',
        image: '', 
        status: '',
        reading_progress: ''
    }]
}

export const booksSlice = createSlice({
    name:'books',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<bookSmall[]>) => { 
            const currentBooks = action.payload;
            currentBooks.reverse();  
            state.books = currentBooks;
        }
    }
})

export const booksState = (state: ExplicitAppState) => state.booksReducer.books;

export const { setBooks } = booksSlice.actions;
export default booksSlice.reducer;