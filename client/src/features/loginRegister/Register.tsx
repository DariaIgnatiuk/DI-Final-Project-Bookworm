import {Link, useNavigate} from 'react-router-dom'
import {useRef, useState} from 'react'
import axios from "axios";
import { BASE_URL } from '../../model/baseURL'

const Register = () => {

    // using useRef hook to create ref for each input field
    const firstNameRef = useRef<HTMLInputElement>(null);
    const familyNameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const dateOfBirthRef = useRef<HTMLInputElement>(null);
    // using useState hook to save the message
    const [message, setMessage] = useState('');
    // using useNavigate hook to navigate to Login page after registration
    const navigate = useNavigate();

    // function to check if the user is at least 12 years old and didn't set their birth date as date in the future
    const checkBirthDate = (date_of_birth:string|undefined):boolean => {
        if (date_of_birth){
        const currentDate = new Date();
        const birthDate = new Date(date_of_birth);
        // checking if the user is setting their birth date as a date in the future
        if (currentDate.getTime() < birthDate.getTime()) {
            setMessage("You can't set your birth date as a date in the future");
            return false;
        }
        // calculating the age of the user
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        // checking if the user is less than 12 years old
        if (age<12) {
            setMessage("You must be at least 12 years old");
            return false;
        }
        return true;}
        // returning false if variable date_of_birth was undefined
        return false;
    }

    // async registration
    const register =  async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLButtonElement>):Promise<void> => {
        e.preventDefault();
        // getting all the values
        const date_of_birth = dateOfBirthRef.current?.value;
        // checking if the user is at least 12 years old and didn't set their birth date as date in the future
        if (!checkBirthDate(date_of_birth)) return;
        const first_name= firstNameRef.current?.value;
        const family_name= familyNameRef.current?.value;
        const username=usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password= passwordRef.current?.value;
        try {
            const response = await axios.post(`${BASE_URL}/user/register`,  
                {
                    first_name, family_name, username, password, email, date_of_birth
                },
                {withCredentials: true});
            // if registration was successful, show the personal greeting message and after 2 seconds navigate to login paga
            if (response.status === 201) {
                    setMessage(response.data.message);
                    setTimeout(function() {
                        navigate('/login');
                      }, 2000);   
                }
            
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.response.data.message);
        }
    }

    const enter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.keyCode === 13) {
            register(event);
        }
    }

    return (
        <>
        <nav>
            <Link to='/login'><button className='navButton'>Login</button></Link>
            <Link to='/'><button className='navButton'>Back</button></Link>
        </nav>
        <div className='main'>
        <h1>Register</h1>
        <form onSubmit={(event) => register(event)}>
        <div className='form'>
            <div className='labels'> 
                <label className='formLabel'>First name: </label>
                <label className='formLabel'>Last name: </label> 
                <label className='formLabel'>Username: </label>
                <label className='formLabel'>Email: </label>
                <label className='formLabel'>Password: </label> 
                <label className='formLabel'>Date of birth: </label> 
            </div>
            <div className='inputsDiv'>
            <input type='text' className='inputs'  ref={firstNameRef}required/>
            <input type='text' className='inputs' ref={familyNameRef} required/>
            <input type='text' className='inputs'  ref={usernameRef}required/>
            <input type='email' className='inputs'  ref={emailRef}required/>
           <input type='password' className='inputs' ref={passwordRef}required/>
           <input type='date' className='inputs'  ref={dateOfBirthRef}required/>
            </div>
        </div>
        <button className='button' type='submit' onKeyUp={(event) => enter(event)}>Register</button>
        </form>
        <div className='errorMessage'>{message}</div>
        </div>

        
        </>
    )
}

export default Register;