import { useNavigate } from "react-router-dom";
import { useSetMessage, useSelectorCurrentBook } from "./state/hooks.js";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";

const DeleteBook = () => {
  const navigate = useNavigate();
  const useSetMessageHook = useSetMessage();
  const book = useSelectorCurrentBook();

  const deleteBook = async (): Promise<void> => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/books/remove/${book.id}`,
        { withCredentials: true }
      );
      useSetMessageHook(response.data);
      setTimeout(function () {
        navigate("/dashboard");
      }, 1500);
    } catch (error: any) {
      // show the error message
      useSetMessageHook(error.response.data.message);
    }
  };

  const handleDeleteBook = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook();
    }
  };

  return (
    <button className="button" onClick={handleDeleteBook}>
      Delete
    </button>
  );
};

export default DeleteBook;
