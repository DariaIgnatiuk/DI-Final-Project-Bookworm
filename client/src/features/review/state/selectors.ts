import { createSelector } from "@reduxjs/toolkit";
import { reviewState, messageState } from "./slice";
import { ReviewFull } from "../../../types";

export const selectMessage = createSelector(
  [messageState],
  (message: string) => {
    return message;
  }
);

export const selectReview = createSelector(
  [reviewState],
  (review: ReviewFull) => {
    return review;
  }
);
