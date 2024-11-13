import { useSelectorCurrentBook } from "./state/hooks.js";
import { useNavigate } from "react-router-dom";

const Congratulations = () => {
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 13) + 1;
  const book = useSelectorCurrentBook();

  const startReview = () => {
    localStorage.setItem("book_id", book.id.toString());
    navigate("/review/add");
  };

  return (
    <>
      <div className="main">
        <h1>Congratulations!</h1>
        <img
          className="gif"
          src={`../../../congratulations/congratulations${randomNumber}.webp`}
        />
        <div className="reviewQuestion">
          <p>Would you like to add a review?</p>
          <div>
            <button className="button" onClick={startReview}>
              Yes
            </button>
            <button
              className="button"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congratulations;
