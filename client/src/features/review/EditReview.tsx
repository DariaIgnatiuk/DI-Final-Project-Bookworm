import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import Navigation from "../navigation/Navigation";
import {useSetMessage, useSetReview, useSelectorMessage, useSelectorReview} from './state/hooks';

const EditReview = () => {
    const { id } = useParams();
    const useSetMessageHook = useSetMessage();
    const useSetReviewHook = useSetReview();
    const review = useSelectorReview();
    const numbers = [1, 2, 3, 4, 5];
    const [score, setScore] = useState(review.score);
    const [heart, setHeart] = useState(review.rating_hearts);
    const [fire, setFire] = useState(review.rating_fire);
    const [tear, setTear] = useState(review.rating_tears);
    const [thoughts, setThoughts] = useState(review.thoughts);
    const [summary, setSummary] = useState(review.summary);
    const [quotes, setQuotes] = useState(review.quotes);
    const [favCharacter, setFavCharacter] = useState(review.favorite_character);
    const [favScene, setFavScene] = useState(review.favorite_scene);
    const [favCharacterWhy, setFavCharacterWhy] = useState(review.why_favorite_character);
    const [favSceneWhy, setFavSceneWhy] = useState(review.why_favorite_scene);
    const navigate = useNavigate();
    
    
    //fetch the review by id
    const fetchReview = async (): Promise<void> => {
      try {
        const response = await axios.get(`${BASE_URL}/reviews/${id}`, {
          withCredentials: true,
        });
        //set the book state to the response data
        useSetReviewHook(response.data[0])
      } catch (error: any) {
        // show the error message
        useSetMessageHook(error.response.data.message);
      }
    };
  
    // fetch the review by id on component mount
    useEffect(() => {
      fetchReview();
    }, []);

    const saveEditedScore = async (): Promise<void> => {
         try {
      await axios.put(
        `${BASE_URL}/books/editScore/${review.book_id}`,
        {
          score: score,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }   
    }


      // edit the book - send request to server
  const saveEditedReview = async (): Promise<void> => {
    // if the score is changed, save it to Books table
    if (score != review.score) saveEditedScore();
    try {
      const response = await axios.put(
        `${BASE_URL}/reviews/edit/${review.id}`,
        {
            summary,
            thoughts,
            quotes,
            favorite_character: favCharacter,
            why_favorite_character : favCharacterWhy,
            favorite_scene: favScene,
            why_favorite_scene: favSceneWhy,
            rating_hearts: heart,
            rating_fire: fire,
            rating_tears: tear
        },
        { withCredentials: true }
      );
      //set the books state to the response data
      useSetMessageHook(response.data.message);
      setTimeout(function () {
        useSetMessageHook('');
        navigate(`/review/${review.id}`);
      }, 2000);

    } catch (error: any) {
      console.log(error);
      // show the error message
      useSetMessageHook(error.message);
    }
  };



    const returnScore = () => {
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

    return (<>
          <Navigation />
      <div className="main">
      <div className="reviewCardBig">
        <div className="bookCardBigImage">
          <img className="bigImage" src={review.image} />
          <br />
          <br />
          {returnScore()}
          <br />
          {returnHearts()}
          <br />
          {returnFire()}
          <br />
          {returnTear()}
          <br/>
          <button className="button" onClick={saveEditedReview}>
            Save
          </button>
        </div>
        <div>
          <h2>{review.title}</h2>
          {review.authors ? <h4>{review.authors}</h4> : <></>}
          <div>
            <div className="form">
              <div className="labels">
                <label className="formLabel">Favorite character: </label>
                <label className="formLabel">Why: </label>
                <label className="formLabel">Favorite scene: </label>
                <label className="formLabel">Why: </label>
              </div>
              <div className="inputsDiv">
                <input type="text" className="reviewInput" value={favCharacter} onChange={(event) =>setFavCharacter(event.target.value)} />
                <input
                  type="text"
                  className="reviewInput"
                  value={favCharacterWhy} onChange={(event) => setFavCharacterWhy(event.target.value)}
                />
                <input type="text" className="reviewInput"  value={favScene} onChange={(event) => setFavScene(event.target.value)}/>
                <input type="text" className="reviewInput" value={favSceneWhy} onChange={(event) => setFavSceneWhy(event.target.value)}/>
              </div>
            </div>
          </div>
          <textarea
            placeholder="Summary"
            style={{ height: "90px", width: "850px" }}
            id="summary"
            value={summary}
            onChange={(event) => {setSummary(event.target.value)}}
          ></textarea>
          <br />
          <textarea
            placeholder="Thoughts"
            style={{ height: "90px", width: "850px" }}
            id="thoughts"
            value={thoughts}
            onChange={(event) => {setThoughts(event.target.value)}}
          ></textarea>
          <br />
          <textarea
            placeholder="Quotes"
            style={{ height: "90px", width: "850px" }}
            id="quotes"
            value={quotes}
            onChange={(event) => {setQuotes(event.target.value)}}
          ></textarea>
        </div>
      </div>
        <div className="errorMessage">{useSelectorMessage()}</div>
      </div>
    </>) 
}

export default EditReview