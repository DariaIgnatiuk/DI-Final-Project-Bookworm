import { useAppDispatch, useAppSelector } from "../../../app/reduxHooks";
import { useCallback } from "react";
import { setReview, setMessage,  } from "./slice";
import { ReviewFull} from "../../../types";
import {
  selectMessage,
  selectReview,
} from "./selectors";


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
export const useSetReview = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (review: ReviewFull) => {
      dispatch(setReview(review));
    },
    [dispatch]
  );
};

export const useSelectorMessage = () => {
  return useAppSelector(selectMessage);
};

export const useSelectorReview = () => {
  return useAppSelector(selectReview);
};
