import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { useSetBooks, useSelectorAllBooks } from "./state/hooks";
import Navigation from "../navigation/Navigation";

const BooksByStatus = () => {
  // state for displaying error message
  const [message, setMessage] = useState("");
  // get user_id from localStorage
  const user_id = localStorage.getItem("user_id");
  // state for books
  const { status } = useParams();
  // useSetBooks hook for managing books state
  const useSetBooksHook = useSetBooks();

  //fetch all books for the user by satus
  const fetchBooks = async (param: string): Promise<void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/allbooks/status`,
        {
          user_id: user_id,
          status: param,
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

  // fetch all books by status on component mount
  useEffect(() => {
    if (status === "reading") {
      fetchBooks("Reading");
    } else if (status === "wanttoread") {
      fetchBooks("WantToRead");
    } else {
      fetchBooks("Finished");
    }
  }, []);

  return (
    <>
      <Navigation />

      <div className="mainByStatus">
        {useSelectorAllBooks()?.map((book) => (
          <Link to={`/book/${book.id}`} className="noUnderlineLink">
            <div className="bookCardMedium">
              <div className="cardMediumImageContainer">
                <img
                  className="mediumImage"
                  key={book.id}
                  src={book.image}
                  alt={book.title}
                />
              </div>
              <div>
                <p className="mediumCardTitle">{book.title}</p>
                <p className="mediumCardAuthor">{book.authors}</p>
                {status === "reading" ? (
                  <img className="statusBar" src="/statusReading.png" />
                ) : status === "finished" ? (
                  <img className="statusBar" src="/statusFinished.png" />
                ) : (
                  <img className="statusBar" src="/statusWantToRead.png" />
                )}
              </div>
            </div>
          </Link>
        ))}
        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};

export default BooksByStatus;
