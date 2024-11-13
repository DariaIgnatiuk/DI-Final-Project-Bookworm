import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";

const Logout = () => {
  const navigate = useNavigate();

  const logout_user = async (): Promise<void> => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // remove user from the localStorage
        localStorage.deleteItem("user_id");
        localStorage.deleteItem("user_email");
        localStorage.deleteItem("user_first_name");
        localStorage.deleteItem("user_family_name");
        localStorage.deleteItem("user_username");
        localStorage.deleteItem("book_id");
      }
    } catch (error) {
      console.log(error);
    }
    // navigate to the first page
    navigate("/");
  };

  return (
    <>
      <button className="navButton" onClick={logout_user}>
        Logout
      </button>
    </>
  );
};

export default Logout;
