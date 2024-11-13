import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { emptyBookExpanded } from "../../types";
import { useNavigate } from "react-router-dom";

const AddReview = () => {
  const id = Number(localStorage.getItem("book_id"));
  const [message, setMessage] = useState("");
  const [book, setBook] = useState(emptyBookExpanded);
  const numbers = [1, 2, 3, 4, 5];
  const [heart, setHeart] = useState(0);
  const [fire, setFire] = useState(0);
  const [tear, setTear] = useState(0);
  const characterRef = useRef<HTMLInputElement>(null);
  const whyCharacterRef = useRef<HTMLInputElement>(null);
  const sceneRef = useRef<HTMLInputElement>(null);
  const whySceneRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //fetch the book by id
  const fetchBook = async (): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/books/book/${id}`, {
        withCredentials: true,
      });
      //set the book state to the response data
      setBook(response.data);
    } catch (error: any) {
      // show the error message
      setMessage(error.response.data.message);
    }
  };

  // fetch the book by id on component mount
  useEffect(() => {
    fetchBook();
  }, []);

  const returnScore = (score: number) => {
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/star.svg" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyStar.svg" />
      )
    );
  };

  const returnHearts = () => {
    return numbers.map((num, index) =>
      num <= heart ? (
        <img
          onClick={() => setHeart(index + 1)}
          className="imgIcon"
          src="../../../rating/heart.svg"
        />
      ) : (
        <img
          onClick={() => setHeart(index + 1)}
          className="imgIcon"
          src="../../../rating/emptyHeart.svg"
        />
      )
    );
  };

  const returnFire = () => {
    return numbers.map((num, index) =>
      num <= fire ? (
        <img
          onClick={() => setFire(index + 1)}
          className="imgIcon"
          src="../../../rating/fire.png"
        />
      ) : (
        <img
          onClick={() => setFire(index + 1)}
          className="imgIcon"
          src="../../../rating/emptyFire.png"
        />
      )
    );
  };

  const returnTear = () => {
    return numbers.map((num, index) =>
      num <= tear ? (
        <img
          onClick={() => setTear(index + 1)}
          className="imgIcon"
          src="../../../rating/tear.png"
        />
      ) : (
        <img
          onClick={() => setTear(index + 1)}
          className="imgIcon"
          src="../../../rating/emptyTear.png"
        />
      )
    );
  };

  const saveReview = async (): Promise<void> => {
    const summary = document.getElementById("summary") as HTMLInputElement;
    const thoughts = document.getElementById("thoughts") as HTMLInputElement;
    const quotes = document.getElementById("quotes") as HTMLInputElement;
    try {
      const response = await axios.post(
        `${BASE_URL}/reviews/add`,
        {
          user_id: localStorage.getItem("user_id"),
          book_id: id,
          summary: summary.value,
          thoughts: thoughts.value,
          quotes: quotes.value,
          favorite_character: characterRef.current?.value,
          why_favorite_character: whyCharacterRef.current?.value,
          favorite_scene: sceneRef.current?.value,
          why_favorite_scene: whySceneRef.current?.value,
          rating_hearts: heart,
          rating_fire: fire,
          rating_tears: tear,
        },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.message);
    }
  };

  return (
    <>
      <div className="reviewCardBig">
        <div className="bookCardBigImage">
          <img className="bigImage" src={book.image} />
          <br />
          <br />
          {book.score ? returnScore(book.score) : <></>}
          <br />
          {returnHearts()}
          <br />
          {returnFire()}
          <br />
          {returnTear()}
          {book.date_start ? (
            <p>
              <span className="bookCardBigInfo">Started: </span>
              {book.date_start}
            </p>
          ) : (
            <></>
          )}
          {book.date_finish ? (
            <p>
              <span className="bookCardBigInfo">Finished: </span>{" "}
              {book.date_finish}
            </p>
          ) : (
            <></>
          )}
          <button onClick={saveReview} className="button">
            Save
          </button>
        </div>
        <div>
          <h2>{book.title}</h2>
          {book.authors ? <h4>{book.authors}</h4> : <></>}
          {book.categories ? (
            <p>
              <span className="bookCardBigInfo">Categories: </span>
              {book.categories}
            </p>
          ) : (
            <></>
          )}
          <div>
            <div className="form">
              <div className="labels">
                <label className="formLabel">Favorite character: </label>
                <label className="formLabel">Why: </label>
                <label className="formLabel">Favorite scene: </label>
                <label className="formLabel">Why: </label>
              </div>
              <div className="inputsDiv">
                <input type="text" className="reviewInput" ref={characterRef} />
                <input
                  type="text"
                  className="reviewInput"
                  ref={whyCharacterRef}
                />
                <input type="text" className="reviewInput" ref={sceneRef} />
                <input type="text" className="reviewInput" ref={whySceneRef} />
              </div>
            </div>
          </div>
          <textarea
            placeholder="Summary"
            style={{ height: "90px", width: "850px" }}
            id="summary"
          ></textarea>
          <br />
          <textarea
            placeholder="Thoughts"
            style={{ height: "90px", width: "850px" }}
            id="thoughts"
          ></textarea>
          <br />
          <textarea
            placeholder="Quotes"
            style={{ height: "90px", width: "850px" }}
            id="quotes"
          ></textarea>
        </div>
      </div>

      <div className="errorMessage">{message}</div>
    </>
  );
};

export default AddReview;
