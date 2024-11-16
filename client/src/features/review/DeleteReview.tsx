import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import {useSetMessage, useSelectorReview} from './state/hooks';
import { useNavigate } from "react-router-dom";

const DeleteReview = () => {

    const useSetMessageHook = useSetMessage()
    const review = useSelectorReview();
    const navigate = useNavigate();

    const deleteReview = async (): Promise<void> => {
        try {
          const response = await axios.delete(
            `${BASE_URL}/reviews/remove/${review.id}`,
            { withCredentials: true }
          );
          useSetMessageHook(response.data);
          setTimeout(function () {
            navigate("/review/all");
          }, 1500);
        } catch (error: any) {
          // show the error message
          useSetMessageHook(error.response.data.message);
        }
      };
    
      const handleDeleteReview = () => {
        if (window.confirm("Are you sure you want to delete this review?")) {
          deleteReview();
        }
      };

    return (
        <button className="button" onClick={handleDeleteReview}>Delete</button>
    )
}

export default DeleteReview