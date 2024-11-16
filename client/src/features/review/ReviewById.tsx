import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import Navigation from "../navigation/Navigation";
import {useSetMessage, useSetReview, useSelectorMessage} from './state/hooks';
import RenderReview from "./RenderReview";

const ReviewById = () => {
  const { id } = useParams();
  const useSetMessageHook = useSetMessage();
  const useSetReviewHook = useSetReview();

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



  return (
    <>
      <Navigation />
      <div className="main">
        <RenderReview/>
        <div className="errorMessage">{useSelectorMessage()}</div>
      </div>
    </>
  );
};

export default ReviewById;
