import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExplicitAppState } from "../../../app/store";
import { ReviewFull, emptyReviewFull } from "../../../types";

export type ReviewsReducerState = {
  review: ReviewFull;
  message: string;
};

const initialState: ReviewsReducerState = {
    review: emptyReviewFull,
    message: ''
};

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setReview: (state, action: PayloadAction<ReviewFull>) => {
      state.review = action.payload;
    },
  },
});

export const reviewState = (state: ExplicitAppState) => state.reviewsReducer.review;
export const messageState = (state: ExplicitAppState) => state.reviewsReducer.message;

export const { setReview, setMessage} = reviewsSlice.actions;
export default reviewsSlice.reducer;
