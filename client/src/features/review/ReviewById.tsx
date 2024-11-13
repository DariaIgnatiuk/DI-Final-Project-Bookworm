import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { emptyReviewFull } from "../../types";
import Navigation from "../navigation/Navigation";

const ReviewById = () => {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [review, setReview] = useState(emptyReviewFull);
  const numbers = [1, 2, 3, 4, 5];
  //fetch the review by id
  const fetchReview = async (): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/${id}`, {
        withCredentials: true,
      });
      //set the book state to the response data
      setReview(response.data[0]);
    } catch (error: any) {
      // show the error message
      setMessage(error.response.data.message);
    }
  };

  // fetch the review by id on component mount
  useEffect(() => {
    fetchReview();
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

  const returnHearts = (score: number) => {
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/heart.svg" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyHeart.svg" />
      )
    );
  };

  const returnFire = (score: number) => {
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/fire.png" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyFire.png" />
      )
    );
  };

  const returnTears = (score: number) => {
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/tear.png" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyTear.png" />
      )
    );
  };

  const renderReview = () => {
    if (review.id > 0)
      return (
        <>
          <div className="reviewCardBig">
            <div className="bookCardBigImage">
              <img className="bigImage" src={review.image} />
              <br />
              <br />
              {review.score ? returnScore(review.score) : <></>}
              <br />
              {review.rating_hearts ? (
                returnHearts(review.rating_hearts)
              ) : (
                <></>
              )}
              <br />
              {review.rating_fire ? returnFire(review.rating_fire) : <></>}
              <br />
              {review.rating_tears ? returnTears(review.rating_tears) : <></>}
              <br />
            </div>
            <div>
              <h2>{review.title}</h2>
              {review.authors ? <h4>{review.authors}</h4> : <></>}
              {review.favorite_character ? (
                <p> Favorite character: {review.favorite_character}</p>
              ) : (
                <></>
              )}
              {review.why_favorite_character ? (
                <p> Why: {review.why_favorite_character}</p>
              ) : (
                <></>
              )}
              {review.favorite_scene ? (
                <p> Favorite scene: {review.favorite_scene}</p>
              ) : (
                <></>
              )}
              {review.why_favorite_scene ? (
                <p> Why: {review.why_favorite_scene}</p>
              ) : (
                <></>
              )}
              {review.summary ? <p> Summary: {review.summary}</p> : <></>}
              {review.thoughts ? <p> Thoughts: {review.thoughts}</p> : <></>}
              {review.quotes ? <p> Quotes: {review.quotes}</p> : <></>}
              <div></div>
            </div>
          </div>
        </>
      );
  };

  return (
    <>
      <Navigation />
      <div className="main">
        {renderReview()}
        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};

export default ReviewById;
