import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { useCallback } from "react";
import { setBooks } from "./slice";
import { bookSmall } from "../../../types";
import {selectBooksFinished, selectBooksReading, selectBooksWantToRead, selectAllBooks} from './selectors'

// set books collection
export const useSetBooks = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (books: bookSmall[]) => {
      dispatch(setBooks(books));
    },
    [dispatch]
  );
};

export const useSelectorBooksFinished = () => {
    return useAppSelector(selectBooksFinished)
}

export const useSelectorBooksReading = () => {
    return useAppSelector(selectBooksReading)
}

export const useSelectorBooksWantToRead = () => {
    return useAppSelector(selectBooksWantToRead)
}

export const useSelectorAllBooks = () => {
  return useAppSelector(selectAllBooks)
}
