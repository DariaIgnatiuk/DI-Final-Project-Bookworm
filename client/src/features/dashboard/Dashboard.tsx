import Logout from '../loginRegister/Logout';
import {useEffect, useState} from 'react'
import axios from "axios";
import { BASE_URL } from '../../model/baseURL'
import { useNavigate, Link } from 'react-router-dom';
import {useSetBooks, useSelectorBooksFinished, useSelectorBooksReading, useSelectorBooksWantToRead} from './state/hooks'



const Dashboard = () => {
    // get user data from localStorage
    const user_first_name = localStorage.getItem('user_first_name');
    const user_id = localStorage.getItem('user_id');
    // state for displaying error message
    const [message, setMessage] = useState('');
    const useSetBooksHook = useSetBooks();
    const navigate = useNavigate();
    let booksReading = useSelectorBooksReading();
    // show only the first 5 book from the list
    if (booksReading.length > 7) {booksReading = booksReading.slice(0, 7);}
    let booksWantToRead = useSelectorBooksWantToRead();
    if (booksWantToRead.length > 7) {booksWantToRead = booksWantToRead.slice(0, 7);}
    let booksFinished = useSelectorBooksFinished();
    if (booksFinished.length > 7) {booksFinished = booksFinished.slice(0, 7);}

    // fetch all books for the user
    const fetchAllBooks = async ():Promise<void>  =>{
        try {
            const response = await axios.post(`${BASE_URL}/books/allbooks`,  
                {
                 user_id: user_id   
                },
                {withCredentials: true});
            //set the books state to the response data
            useSetBooksHook(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

    // fetch all books on component mount
    useEffect(() => {
        fetchAllBooks();
    },[])

    return (
        <>
        <nav>
            <Link to='/books/search'><button className='navButton'>Add a book</button></Link>
            <Logout/>
        </nav>
        <div className='main'>
        <h3 id='dashboardHeading'>Welcome to your Dashboard, {user_first_name} !</h3>


        {/* if there are books with status = Reading, display them */}
        {(booksReading.length != 0)? (
            <div className='bookCollection'>
            <div className='dashboardStatus'>Reading</div>
            { booksReading.map(book => (
                <Link to={`/book/${book.id}`}><div className='bookCard'><img className='smallImage' key={book.id} src={book.image} alt={book.title} /></div></Link>
            )) }
            <button className='dashboardButton' onClick={()=>navigate('/books/reading')}>View all</button>
            </div>) 
        :<></>}


        {/* if there are books with status = Finished, display them */}
        {(booksFinished.length != 0)? (
            <div className='bookCollection'>
            <div className='dashboardStatus'><p className='status'>Finished</p></div>
            { booksFinished.map(book => (
                <Link to={`/book/${book.id}`}><div className='bookCard'><img className='smallImage'key={book.id} src={book.image} alt={book.title} /></div></Link>
            )) }
            <button className='dashboardButton' onClick={()=>navigate('/books/finished')}>View all</button>
            </div>) 
        :<></>}



        {/* if there are books with status = WantToRead, display them */}
         {(booksWantToRead.length != 0)? (
            <div className='bookCollection'>
            <div className='dashboardStatus'>Want to read</div>
            { booksWantToRead.map(book => ( 
                <Link to={`/book/${book.id}`}><div className='bookCard'><img className='smallImage' key={book.id} src={book.image} alt={book.title} /></div></Link>
            )) }
            <button className='dashboardButton' onClick={()=>navigate('/books/wanttoread')}>View all</button>
            </div>) 
        :<></>} 



        <div className='errorMessage'>{message}</div>
        </div>

        </>
    )
}

export default Dashboard;