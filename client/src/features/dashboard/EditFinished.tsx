import { useSelectorCurrentBook, useSetMessage } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";

const EditFinished = () => {
  const book = useSelectorCurrentBook();
  const useSetMessageHook = useSetMessage();

  const [renderInputs, setRenderInputs] = useState(false);
  const navigate = useNavigate();
  const [score, setScore] = useState(book.score as number);

  // edit the book - send request to server
  const editBook = async (): Promise<void> => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    dialog.close();

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

  const getAdditionalInfo = () => {
    return (
      <dialog open id="dialog">
        <div className="dialogWindow">
          <div>{returnScore()}</div>
          <br />
          <button className="button" onClick={editBook}>
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
        Change rating
      </button>
      {renderInputs ? getAdditionalInfo() : <></>}
    </>
  );
};

export default EditFinished;
