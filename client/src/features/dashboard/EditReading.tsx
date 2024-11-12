import { useSelectorCurrentBook, useSetMessage } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { checkScore } from "../../utils/validations.js";

const EditReading = () => {
  const book = useSelectorCurrentBook();
  const useSetMessageHook = useSetMessage();
  const [renderInputs, setRenderInputs] = useState(false);
  const [progress, setProgress] = useState(book.reading_progress);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();
  const rateRef = useRef<HTMLInputElement>(null);
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

  const saveFinishedBook = async (): Promise<void> => {
    const score = Number(rateRef.current?.value);
    if (!score) {
      useSetMessageHook("Please enter a score");
      return;
    }
    if (!checkScore(score)) {
      useSetMessageHook("Score can not be higher than 5 or lower than 0");
      return;
    }
    const date_finish = new Date();
    try {
      const response = await axios.put(
        `${BASE_URL}/books/edit/${book.id}`,
        {
          booktype: book.booktype,
          date_finish: date_finish.getDate(),
          date_start: book.date_start,
          pagecount: book.pagecount,
          pagetype: book.pagetype,
          reading_progress: progress,
          score: score,
          status: 'Finished',
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      useSetMessageHook(response.data.message);
      setTimeout(function () {
        useSetMessageHook("");
        navigate('/books/congratulations')
      }, 1500);
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  }

  const finishBook = () => {
    return (<>
      <label>How would you rate this book?  </label>
      <input ref={rateRef}placeholder="0..5"/> <br/>
      <button onClick={saveFinishedBook}>Save</button>
    </>)
  };

  // edit the book - send request to server
  const saveProgress = async (): Promise<void> => {
    try {
      const response = await axios.put(
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
      useSetMessageHook(response.data.message);
      setTimeout(function () {
        useSetMessageHook("");
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  };

  const checkIfFinished = () => {
    if (progress < book.pagecount) saveProgress();
    else {setFinished(true);
      setRenderInputs(false);
    };
  };

  const getAdditionalInfo = () => {
    return (
      <div>
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
        <button onClick={checkIfFinished}>Save</button>
      </div>
    );
  };

  return (
    <>
      {!renderInputs ? (
        <button
          onClick={() => {
            setRenderInputs(true);
          }}
        >
          Mark Progress
        </button>
      ) : (
        <></>
      )}
      {renderInputs ? getAdditionalInfo() : <></>}
      {finished ? finishBook() : <></>}
    </>
  );
};

export default EditReading;