import Navigation from "../navigation/Navigation";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { useEffect, useState } from "react";
import { emptyReview } from "../../types";
import { useNavigate } from "react-router-dom";

const AllReviews = () => {
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([emptyReview]);
  const [haveReviews, setHaveReviews] = useState(false);
  const id = localStorage.getItem("user_id");
  const numbers = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const fetchReviews = async (): Promise<void> => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/all/${id}`, {
        withCredentials: true,
      });
      //set the book state to the response data
      setReviews(response.data);
      if (response.data.length > 0) setHaveReviews(true);
      console.log(response.data);
    } catch (error: any) {
      // show the error message
      setMessage(error.response.data.message);
    }
  };

  const returnScore = (score: number) => {
    return numbers.map((num) =>
      num <= score ? (
        <img className="imgIcon" src="../../../rating/star.svg" />
      ) : (
        <img className="imgIcon" src="../../../rating/emptyStar.svg" />
      )
    );
  };

  const renderReviews = () => {
    return reviews.map((review) => (
      <div className="reviewCardMedium">
        <div className="cardMediumImageContainer">
          <img
            className="mediumImage"
            key={review.id}
            src={review.image}
            alt={review.title}
          />
        </div>
        <div>
          <p className="mediumCardTitle">{review.title}</p>
          <p className="mediumCardAuthor">{review.authors}</p>
          {review.score ? returnScore(review.score) : <></>} <br />
          <br />
          <button
            className="button"
            onClick={() => navigate(`/review/${review.id}`)}
          >
            View
          </button>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <Navigation />
      <div className="main">
        <div className="mainByStatus">
          {haveReviews ? (
            renderReviews()
          ) : (
            <h1>You didn't leave any reviews yes</h1>
          )}
        </div>
        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};
export default AllReviews;
