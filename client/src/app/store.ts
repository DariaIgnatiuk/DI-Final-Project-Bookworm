import { configureStore, combineReducers } from "@reduxjs/toolkit";
import booksReducer from "../features/dashboard/state/slice";
import { BooksReducerState } from "../features/dashboard/state/slice";
import reviewsReducer from '../features/review/state/slice'
import { ReviewsReducerState } from '../features/review/state/slice'

const combineReducersApp = combineReducers({ booksReducer, reviewsReducer });

const store = configureStore({
  reducer: combineReducersApp,
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

export default store;

export type ExplicitAppState = {
  booksReducer: BooksReducerState;
  reviewsReducer: ReviewsReducerState;
};
