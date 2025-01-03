// import "./App.css";
import Homepage from "./features/loginRegister/Homepage";
import Register from "./features/loginRegister/Register";
import Login from "./features/loginRegister/Login";
import Dashboard from "./features/dashboard/Dashboard";
import Auth from "./features/auth/Auth";
import BooksByStatus from "./features/dashboard/BooksByStatus";
import BookByID from "./features/dashboard/BookByID";
import SearchForBooks from "./features/search/SearchForBooks";
import AddBook from "./features/search/AddBook";
import Congratulations from "./features/dashboard/Congratulations";
import AddReview from "./features/review/AddReview";
import AllReviews from "./features/review/AllReviews";
import ReviewById from "./features/review/ReviewById";
import { Route, Routes } from "react-router-dom";
import EditReview from "./features/review/EditReview";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route
          path="/books/:status"
          element={
            <Auth>
              <BooksByStatus />
            </Auth>
          }
        />
        <Route
          path="/book/:id"
          element={
            <Auth>
              <BookByID />
            </Auth>
          }
        />
        <Route
          path="/books/search"
          element={
            <Auth>
              <SearchForBooks />
            </Auth>
          }
        />
        <Route
          path="/books/search/:id"
          element={
            <Auth>
              <AddBook />
            </Auth>
          }
        />
        <Route
          path="/books/congratulations"
          element={
            <Auth>
              <Congratulations />
            </Auth>
          }
        />
        <Route
          path="/review/add"
          element={
            <Auth>
              <AddReview />
            </Auth>
          }
        />
        <Route
          path="/review/all"
          element={
            <Auth>
              <AllReviews />
            </Auth>
          }
        />
        <Route
          path="/review/:id"
          element={
            <Auth>
              <ReviewById />
            </Auth>
          }
        />
                <Route
          path="/review/edit/:id"
          element={
            <Auth>
              <EditReview />
            </Auth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
