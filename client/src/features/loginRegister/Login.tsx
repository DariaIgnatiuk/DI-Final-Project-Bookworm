import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";

const Login = () => {
  // using useRef hook to create ref for each input field
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  // using useState hook to save the message
  const [message, setMessage] = useState("");
  // using useNavigate hook to navigate to Login page after registration
  const navigate = useNavigate();

  const login = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(
        `${BASE_URL}/user/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      // if login was successful, show the personal greeting message and after 1 second navigate to dashboard
      if (response.status === 200) {
        localStorage.setItem("user_id", response.data.user.id);
        localStorage.setItem("user_email", response.data.user.email);
        localStorage.setItem("user_first_name", response.data.user.first_name);
        localStorage.setItem(
          "user_family_name",
          response.data.user.family_name
        );
        localStorage.setItem("user_username", response.data.user.username);
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.response.data.message);
      // clear the input fields
      if (usernameRef.current) usernameRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
    }
  };

  const enter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.keyCode === 13) {
      login(event);
    }
  };

  return (
    <>
      <nav>
        <Link to="/register">
          <button className="navButton">Register</button>
        </Link>
        <Link to="/">
          <button className="navButton">Back</button>
        </Link>
      </nav>
      <div className="main">
        <h1>Login</h1>
        <form onSubmit={(event) => login(event)}>
          <div className="form">
            <div className="labels">
              <label className="formLabel">Username: </label>
              <label className="formLabel">Password: </label>
            </div>
            <div className="inputsDiv">
              <input
                type="text"
                className="inputs"
                ref={usernameRef}
                required
              />
              <input
                type="password"
                className="inputs"
                ref={passwordRef}
                required
              />
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onKeyUp={(event) => enter(event)}
          >
            Login
          </button>
        </form>

        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};

export default Login;
