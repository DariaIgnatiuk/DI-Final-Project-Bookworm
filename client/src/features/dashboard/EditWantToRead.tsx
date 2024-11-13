import { useSelectorCurrentBook, useSetMessage } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { chectDateNotInTheFuture } from "../../utils/validations.js";

const EditWantToRead = () => {
  const book = useSelectorCurrentBook();
  const useSetMessageHook = useSetMessage();
  // references for inputs
  const date_startRef = useRef<HTMLInputElement>(null);
  const booktypeRef = useRef<HTMLSelectElement>(null);
  const pagetypeRef = useRef<HTMLSelectElement>(null);
  const pagecountRef = useRef<HTMLInputElement>(null);
  const [renderInputs, setRenderInputs] = useState(false);
  const navigate = useNavigate();

  // edit the book - send request to server
  const editBook = async (): Promise<void> => {
    const dialog = document.getElementById("dialog") as HTMLDialogElement;
    dialog.close();
    const pagetype = pagetypeRef.current?.value
      ? pagetypeRef.current?.value
      : book.pagetype;
    const booktype = booktypeRef.current?.value
      ? booktypeRef.current?.value
      : book.booktype;
    const pagecount = pagecountRef.current?.value
      ? Number(pagecountRef.current?.value)
      : book.pagecount;
    let date_start = date_startRef.current?.value.toString();
    // if the user didn't pick start date, it is set as today
    if (!date_start) {
      const currentDate = new Date();
      date_start = currentDate.toLocaleDateString();
    }
    // check if the start date is in the future
    if (!chectDateNotInTheFuture(date_start)) {
      useSetMessageHook("You can't choose future date");
      return;
    }
    try {
      const response = await axios.put(
        `${BASE_URL}/books/edit/${book.id}`,
        {
          booktype: booktype,
          date_finish: null,
          date_start: date_start,
          pagecount: pagecount,
          pagetype: pagetype,
          reading_progress: 0,
          score: null,
          status: "Reading",
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
        Start Reading
      </button>
      {renderInputs ? getAdditionalInfo() : <></>}
    </>
  );
};

export default EditWantToRead;
