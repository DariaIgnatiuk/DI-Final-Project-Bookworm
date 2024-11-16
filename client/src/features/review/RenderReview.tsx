import {useSelectorReview} from './state/hooks';
import DeleteReview from "./DeleteReview";
import { useNavigate } from "react-router-dom";

const RenderReview = () => {

    const numbers = [1, 2, 3, 4, 5];
    const review = useSelectorReview();
    const navigate = useNavigate();

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
                  <button className='button' onClick={() => navigate(`/review/edit/${review.id}`)}>Edit</button>
                  <DeleteReview />
                </div>
              </div>
            </>
          );
      };

    return (<>
    {renderReview()}
    </>)
}

export default RenderReview