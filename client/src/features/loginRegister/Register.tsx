import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { checkPassword, chectDateNotInTheFuture, checkBirthDate } from '../../utils/validations'

const Register = () => {
  // using useRef hook to create ref for each input field
  const firstNameRef = useRef<HTMLInputElement>(null);
  const familyNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dateOfBirthRef = useRef<HTMLInputElement>(null);
  // using useState hook to save the message
  const [message, setMessage] = useState("");
  // using useNavigate hook to navigate to Login page after registration
  const navigate = useNavigate();


  // async registration
  const register = async (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    const date_of_birth = dateOfBirthRef.current?.value as string;
    // checking if set their birth date as date in the future
    if (!chectDateNotInTheFuture(date_of_birth) ){
      setMessage("You can't set your birth date as a date in the future");
      return;    
    }

    if (!checkBirthDate(date_of_birth)) {
      setMessage("You must be at least 7 years old");
      return;
    }
    // checking if password is at least 8 characters long
    const password = passwordRef.current?.value.trim() as string;
    if (!checkPassword(password)) {
      setMessage("Password must be at least 8 characters long");
      return;
    }
        // getting all the values
    const first_name = firstNameRef.current?.value.trim();
    const family_name = familyNameRef.current?.value.trim();
    const username = usernameRef.current?.value.trim();
    const email = emailRef.current?.value.toLowerCase().trim();
    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`,
        {
          first_name,
          family_name,
          username,
          password,
          email,
          date_of_birth,
        },
        { withCredentials: true }
      );
      // if registration was successful, show the personal greeting message and after 2 seconds navigate to login paga
      if (response.status === 201) {
        setMessage(response.data.message);
        setTimeout(function () {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
      // show the error message
      setMessage(error.response.data.message);
    }
  };

  const enter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.keyCode === 13) {
      register(event);
    }
  };

  return (
    <>
      <nav>
        <Link to="/login">
          <button className="navButton">Login</button>
        </Link>
        <Link to="/">
          <button className="navButton">Back</button>
        </Link>
      </nav>
      <div className="main">
        <h1>Register</h1>
        <form onSubmit={(event) => register(event)}>
          <div className="form">
            <div className="labels">
              <label className="formLabel">First name: </label>
              <label className="formLabel">Last name: </label>
              <label className="formLabel">Username: </label>
              <label className="formLabel">Email: </label>
              <label className="formLabel">Password: </label>
              <label className="formLabel">Date of birth: </label>
            </div>
            <div className="inputsDiv">
              <input
                type="text"
                className="inputs"
                ref={firstNameRef}
                required
              />
              <input
                type="text"
                className="inputs"
                ref={familyNameRef}
                required
              />
              <input
                type="text"
                className="inputs"
                ref={usernameRef}
                required
              />
              <input type="email" className="inputs" ref={emailRef} required />
              <input
                type="password"
                className="inputs"
                ref={passwordRef}
                required
              />
              <input
                type="date"
                className="inputs"
                ref={dateOfBirthRef}
                required
              />
            </div>
          </div>
          <button
            className="button"
            type="submit"
            onKeyUp={(event) => enter(event)}
          >
            Register
          </button>
        </form>
        <div className="errorMessage">{message}</div>
      </div>
    </>
  );
};

export default Register;
