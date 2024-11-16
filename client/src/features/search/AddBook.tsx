import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { emptyBookExpanded } from "../../types";
import Navigation from "../navigation/Navigation";

const AddBook = () => {
  // state for displaying error message
  const [message, setMessage] = useState("");
  const [book, setBook] = useState(emptyBookExpanded);
  const [status, setStatus] = useState("");

  // getting book id from params
  const { id } = useParams();
  const navigate = useNavigate();
  // references for inputs
  const date_startRef = useRef<HTMLInputElement>(null);
  const date_finishRef = useRef<HTMLInputElement>(null);
  const booktypeRef = useRef<HTMLSelectElement>(null);
  const pagetypeRef = useRef<HTMLSelectElement>(null);
  const pagecountRef = useRef<HTMLInputElement>(null);
  const [score, setScore] = useState(0);

  // fetch all the information about the book from Google Book API on component mount
  const fetchBook = async (): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/books/search/${id}`, {
        withCredentials: true,
      });
      //set the books state to the response data
      setBook(response.data);
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.message);
    }
  };

  // fetch the book on component mount
  useEffect(() => {
    fetchBook();
  }, []);

  // add the book to DB
  const postBook = async (): Promise<void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/books/add`,
        {
          authors: book.authors,
          booktype: book.booktype,
          categories: book.categories,
          date_finish: book.date_finish,
          date_start: book.date_start,
          description: book.description,
          image: book.image,
          language: book.language,
          pagecount: book.pagecount,
          pagetype: book.pagetype,
          publisher: book.publisher,
          reading_progress: book.reading_progress,
          score,
          status: book.status,
          title: book.title,
          user_id: localStorage.getItem("user_id"),
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      setMessage(response.data);
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.message);
    }
  };

  // post book, show the success message and navitage to Dashboard
  const addBookToDB = () => {
    // request to add the book
    postBook();
    // show the success message and navigate to Dashboard after 1.5 seconds
    setTimeout(function () {
      navigate("/dashboard");
    }, 1500);
  };

const checkDates = (date_start:string, date_finish:string) => {
  const startDate = new Date(date_start);
  const finishDate = new Date(date_finish);
  if (finishDate < startDate) return false;
  return true;
}

  // ONLY FOR FINISHED validates Finished books
  const statusFinishedValidateInput = () => {
    const date_start = date_startRef.current?.value.toString();
    const date_finish = date_finishRef.current?.value.toString();
    // dates are not saved if they weren't filled in
    if (date_start && date_finish) 
      if (!checkDates(date_start, date_finish)) {setMessage('Finish date can not be earlier than start date.'); return; }
    if (date_start) {
      book.date_start = date_start;
    }
    if (date_finish) {
      book.date_finish = date_finish;
    }
    addBookToDB();
  };


  const returnScore = () => {
    const numbers = [1, 2, 3, 4, 5];
    return numbers.map((num, index) =>
        num <= score ? (
          <img
            onClick={() => setScore(index + 1)}
            className="imgIcon"
            src="../../../rating/star.svg"
          />
        ) : (
          <img
            onClick={() => setScore(index + 1)}
            className="imgIcon"
            src="../../../rating/emptyStar.svg"
          />
        )
      );
    };

  // ONLY FOR FINISHED shows inputs for Finished books (rating, start and finish dates)
  const statusFinishedGetAdditionalInfo = () => {
    book.status = "Finished";
    return (
      <dialog open id="dialog">
        <div className="dialogWindow">
          <label>When did you start reading this book? </label>
          <input type="date" ref={date_startRef} />
          <br />
          <label>When did you finish reading this book? </label>
          <input type="date" ref={date_finishRef} /> <br />
          <label>How would you rate this book? </label>
          <div> {returnScore()}</div>
          <button className="button" onClick={statusFinishedValidateInput}>
            Save
          </button>
        </div>
      </dialog>
    );
  };

  // ONLY FOR READING validates Reading Now books
  const statusReadingValidateInput = () => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    dialog.close();
    book.date_start = date_startRef.current?.value.toString();
    // if the user didn't set start date, it is set as current date
    if (!book.date_start) {
      const currentDate = new Date();
      book.date_start = currentDate.toLocaleDateString();
    }
    book.booktype = booktypeRef.current?.value;
    book.pagetype = pagetypeRef.current?.value;
    if (pagecountRef.current?.value) book.pagecount = Number(pagecountRef.current?.value);
    addBookToDB();
  };

  // ONLY FOR READING shows inputs for Reading Now books (start date, book type, number of pages)
  const statusReadingGetAdditionalInfo = () => {
    book.status = "Reading";
    return (
      <dialog open id="dialog">
        <div className="dialogWindow">
          <label className="label">
            When did you start reading this book?{" "}
          </label>
          <input type="date" ref={date_startRef} />
          <br />
          <label className="label">What kind of book do you read? </label>
          <select id="book_type" ref={booktypeRef}>
            <option value="Physical">Paper</option>
            <option value="eBook">e-book</option>
            <option value="Audiobook">Audiobook</option>
          </select>
          <br />
          <label className="label">
            How would you like to display your pages?{" "}
          </label>
          <select id="page_type" ref={pagetypeRef}>
            <option value="Page">Page</option>
            <option value="Percentage">Percentage</option>
            <option value="Episode">Episode</option>
          </select>
          <br />
          <label className="label">Total pages: </label>
          <input type="text" ref={pagecountRef} />
          <br />
          <button className="button" onClick={statusReadingValidateInput}>
            Save
          </button>
        </div>
      </dialog>
    );
  };

  // render the book into from server only if book id = 0 (so it fetched without errors)
  const renderBook = () => {
    return (
      <div className="bookCardBig">
        <div className="bookCardBigImage">
          {book.image ? (
            <img src={book.image} className="bigImage" alt={book.title} />
          ) : (
            <img
              src="../../../Missing-book-cover.jpg"
              className="bigImage"
              alt="Missing Book Cover"
            />
          )}
        </div>
        <div>
          <h2>{book.title}</h2>
          <h4>{book.authors}</h4>
          {book.categories ? (
            <p>
              <span className="bookCardBigInfo">Categories: </span>
              {book.categories}
            </p>
          ) : (
            <></>
          )}
          {book.language ? (
            <p>
              <span className="bookCardBigInfo">Language: </span>
              {book.language}
            </p>
          ) : (
            <></>
          )}
          {book.description ? (
            <p className="description">
              <span className="bookCardBigInfo">Description: </span>
              {book.description}
            </p>
          ) : (
            <></>
          )}
          <button
            className="buttonBig"
            onClick={() => {
              book.status = "WantToRead";
              addBookToDB();
            }}
          >
            Add to the reading list
          </button>
          <button
            className="buttonBig"
            onClick={() => {
              setStatus("Reading");
            }}
          >
            Start reading now
          </button>
          <button
            className="buttonBig"
            onClick={() => {
              setStatus("Finished");
            }}
          >
            Mark as finished
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navigation/>
      <div className="main">
        <div className="errorMessage">{message}</div>
        {book.id === 0 ? renderBook() : <></>}
        {status === "Finished" ? statusFinishedGetAdditionalInfo() : <></>}
        {status === "Reading" ? statusReadingGetAdditionalInfo() : <></>}
      </div>
    </>
  );
};

export default AddBook;
