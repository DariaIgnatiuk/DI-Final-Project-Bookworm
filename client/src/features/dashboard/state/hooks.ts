import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { useCallback } from "react";
import { setBooks, setMessage, setCurrentBook } from "./slice";
import { bookSmall, bookExpanded } from "../../../types";
import {selectBooksFinished, selectBooksReading, selectBooksWantToRead, selectAllBooks, selectMessage, selectCurrentBook} from './selectors'

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

// set message
export const useSetMessage = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (message: string) => {
      dispatch(setMessage(message));
    },
    [dispatch]
  );
};

// set current book
export const useSetCurrentBook = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (currentBook: bookExpanded) => {
      dispatch(setCurrentBook(currentBook));
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

export const useSelectorMessage = () => {
  return useAppSelector(selectMessage)
}

export const useSelectorCurrentBook = () => {
  return useAppSelector(selectCurrentBook)
}
