import { useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../model/baseURL'

interface AuthProps {
  children: ReactNode;
}

const Auth: React.FC<AuthProps>  = ({ children}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(()=>{
    verify()
  },[])

  const verify = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/auth`, {
        withCredentials: true,
      });      
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
      setRedirect(false);
    }
  };

  return redirect ? children : 
  <>
  <nav>
  <Link to='/'><button className='navButton'>Back</button></Link>
  </nav>
  <div className="main">
    <h2 id='authHeader'>You are not authorized</h2>
    <h4>Please log in or register</h4>
  </div>
    
  </>
  ;
};

export default Auth;
