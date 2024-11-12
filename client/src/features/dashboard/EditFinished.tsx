import { useSelectorCurrentBook, useSetMessage } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { checkScore } from "../../utils/validations.js";

const EditFinished = () => {
  const book = useSelectorCurrentBook();
  const useSetMessageHook = useSetMessage();
  // references for inputs
  const scoreRef = useRef<HTMLInputElement>(null);
  const [renderInputs, setRenderInputs] = useState(false);
  const navigate = useNavigate();

  // edit the book - send request to server
  const editBook = async (): Promise<void> => {
    const score = Number(scoreRef.current?.value);
    if (!score) {
      useSetMessageHook("Please enter a score");
      return;
    }
    if (!checkScore(score)) {
      useSetMessageHook("Score can not be higher than 5 or lower than 0");
      return;
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/books/edit/${book.id}`,
        {
          booktype: book.booktype,
          date_finish: book.date_finish,
          date_start: book.date_start,
          pagecount: book.pagecount,
          pagetype: book.pagetype,
          reading_progress: book.reading_progress,
          score: score,
          status: book.status,
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      useSetMessageHook(response.data.message);
      setTimeout(function () {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  };

  const getAdditionalInfo = () => {
    return (
      <div>
        <p>My rating for this book: {book.score}</p>
        <p>I would like to change it to: </p>
        <input type="text" ref={scoreRef} />
        <br />
        <button onClick={editBook}>Save</button>
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
          Change rating
        </button>
      ) : (
        <></>
      )}
      {renderInputs ? getAdditionalInfo() : <></>}
    </>
  );
};

export default EditFinished;
