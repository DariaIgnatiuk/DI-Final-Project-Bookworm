import Logout from "../loginRegister/Logout";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { useNavigate, Link } from "react-router-dom";
import {
  useSetBooks,
  useSelectorBooksFinished,
  useSelectorBooksReading,
  useSelectorBooksWantToRead,
  useSelectorAllBooks,
} from "./state/hooks";
import { bookSmall } from "../../types";
import { ReactNode } from "react";

const Dashboard = () => {
  // get user data from localStorage
  const user_first_name = localStorage.getItem("user_first_name");
  const user_id = localStorage.getItem("user_id");
  // state for displaying error message
  const [message, setMessage] = useState("");
  const useSetBooksHook = useSetBooks();
  const navigate = useNavigate();
  // number of books of the user's collection
  const numberOfBooks = useSelectorAllBooks().length;
  let booksReading = useSelectorBooksReading();
  let booksFinished = useSelectorBooksFinished();
  let booksWantToRead = useSelectorBooksWantToRead();
  const allbooks = useSelectorAllBooks();

  // fetch all books for the user
  const fetchAllBooks = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/allbooks`,
        {
          user_id: user_id,
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      useSetBooksHook(response.data);
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.message);
    }
  };

  // fetch all books on component mount
  useEffect(() => {
    fetchAllBooks();
  }, []);

  // checks if the user has 0 books
  const checkIfZeroBooks = () => {
    if (allbooks.length === 0)
      return (
        <div id="zeroBooks">
          <p>You don't have any books in your collection yet</p>
          <Link to="/books/search">
            <button className="button">Add a book</button>
          </Link>
        </div>
      );
  };

  // renders one book
  const renderOneBook = (book: bookSmall) => {
    return (
      <Link to={`/book/${book.id}`}>
        <div className="bookCard">
          <img
            className="smallImage"
            key={book.id}
            src={book.image}
            alt={book.title}
          />
        </div>
      </Link>
    );
  };

  // in there are books with status Reading, render them
  const renderBooksReading = (): ReactNode => {
    // show only the first 7 book from the list
    if (booksReading.length > 7) {
      booksReading = booksReading.slice(0, 7);
    }
    // render the books if there are books with this status
    if (booksReading.length != 0)
      return (
        <div className="bookCollection">
          <div className="dashboardStatus">Reading</div>
          {booksReading.map((book) => renderOneBook(book))}
          <button
            className="dashboardButton"
            onClick={() => navigate("/books/reading")}
          >
            View all
          </button>
        </div>
      );
  };

  // in there are books with status Finished, render them
  const renderBooksFinished = (): ReactNode => {
    if (booksFinished.length > 7) {
      booksFinished = booksFinished.slice(0, 7);
    }
    // render the books if there are books with this status
    if (booksFinished.length != 0)
      return (
        <div className="bookCollection">
          <div className="dashboardStatus">Finished</div>
          {booksFinished.map((book) => renderOneBook(book))}
          <button
            className="dashboardButton"
            onClick={() => navigate("/books/finished")}
          >
            View all
          </button>
        </div>
      );
  };

  // in there are books with status Want to read, render them
  const renderBooksWantToRead = (): ReactNode => {
    if (booksWantToRead.length > 7) {
      booksWantToRead = booksWantToRead.slice(0, 7);
    }
    // render the books if there are books with this status
    if (booksWantToRead.length != 0)
      return (
        <div className="bookCollection">
          <div className="dashboardStatus">Wanto to Read</div>
          {booksWantToRead.map((book) => renderOneBook(book))}
          <button
            className="dashboardButton"
            onClick={() => navigate("/books/wanttoread")}
          >
            View all
          </button>
        </div>
      );
  };

  return (
    <>
      <nav>
        <Link to="/review/all">
          <button className="navButton">My reviews</button>
        </Link>
        <Link to="/books/search">
          <button className="navButton">Add a book</button>
        </Link>
        <Logout />
      </nav>
      <div className="main">
        <h3 id="dashboardHeading">
          Welcome to your Dashboard, {user_first_name} !
        </h3>
        {}


        {numberOfBooks === 0 ? (
          checkIfZeroBooks()
        ) : (
          <>
            {renderBooksReading()} {renderBooksFinished()}{" "}
            {renderBooksWantToRead()}
          </>
        )}


        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};

export default Dashboard;
