import { useSelectorCurrentBook, useSetMessage } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";

const EditReading = () => {
  const book = useSelectorCurrentBook();
  const useSetMessageHook = useSetMessage();
  const [renderInputs, setRenderInputs] = useState(false);
  const [progress, setProgress] = useState(book.reading_progress);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const options: JSX.Element[] = [
    <option key={0} value={0}>
      0
    </option>,
  ];
  if (book.pagetype === "Page")
    for (let i = 1; i <= book.pagecount; i++) {
      options.push(
        <option key={i} value={i}>
          p. {i} ({((i / book.pagecount) * 100).toFixed(2)}%)
        </option>
      );
    }
  else if (book.pagetype === "Episode")
    for (let i = 1; i <= book.pagecount; i++) {
      options.push(
        <option key={i} value={i}>
          ep. {i} ({((i / book.pagecount) * 100).toFixed(2)}%)
        </option>
      );
    }
  else {
    for (let i = 1; i <= book.pagecount; i++) {
      options.push(
        <option key={i} value={i}>
          {i} %
        </option>
      );
    }
  }

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

  const saveFinishedBook = async (): Promise<void> => {
    const dialog = document.getElementById("dialog2") as HTMLDialogElement;
    dialog.close();
    const date_finish = new Date();
    try {
      const response = await axios.put(
        `${BASE_URL}/books/edit/${book.id}`,
        {
          booktype: book.booktype,
          date_finish: date_finish.toLocaleDateString(),
          date_start: book.date_start,
          pagecount: book.pagecount,
          pagetype: book.pagetype,
          reading_progress: progress,
          score: score,
          status: "Finished",
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      useSetMessageHook(response.data.message);
      setTimeout(function () {
        useSetMessageHook("");
        navigate("/books/congratulations");
      }, 1500);
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  };

  const finishBook = () => {
    return (
      <dialog open id="dialog2">
        <div className="dialogWindow">
          <label>How would you rate this book? </label>
          <br />
          <div>{returnScore()}</div>

          {/* <input ref={rateRef} placeholder="0..5" /> <br /> */}
          <button className="button" onClick={saveFinishedBook}>
            Save
          </button>
        </div>
      </dialog>
    );
  };

  // edit the book - send request to server
  const saveProgress = async (): Promise<void> => {
    try {
      await axios.put(
        `${BASE_URL}/books/edit/${book.id}`,
        {
          booktype: book.booktype,
          date_finish: book.date_finish,
          date_start: book.date_start,
          pagecount: book.pagecount,
          pagetype: book.pagetype,
          reading_progress: progress,
          score: book.score,
          status: book.status,
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      window.location.reload();
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  };

  const checkIfFinished = () => {
    const dialog = document.getElementById("dialog1") as HTMLDialogElement;
    dialog.close();
    if (progress < book.pagecount) saveProgress();
    else {
      setFinished(true);
      setRenderInputs(false);
    }
  };

  const getAdditionalInfo = () => {
    return (
      <dialog open id="dialog1">
        <div className="dialogWindow">
          <p>How much did you read? </p>
          <select
            id="book_type"
            value={progress}
            onChange={(e) => {
              setProgress(Number(e.target.value));
            }}
          >
            {options}
          </select>
          <br />
          <button className="button" onClick={checkIfFinished}>
            Save
          </button>
        </div>
      </dialog>
    );
  };

  return (
    <>
      <button
        className="button"
        onClick={() => {
          setRenderInputs(!renderInputs);
        }}
      >
        Mark Progress
      </button>
      {renderInputs ? getAdditionalInfo() : <></>}
      {finished ? finishBook() : <></>}
    </>
  );
};

export default EditReading;
