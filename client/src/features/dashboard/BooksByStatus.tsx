
import {useParams, Link} from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from "axios";
import { BASE_URL } from '../../model/baseURL';
import {useSetBooks, useSelectorAllBooks} from './state/hooks'
import Navigation from '../navigation/Navigation';


const BooksByStatus = () => {
    // status parameter from the url
    const [heading, setHeading] = useState('')
    // state for displaying error message
    const [message, setMessage] = useState('');
    // get user_id from localStorage
    const user_id = localStorage.getItem('user_id');
    // state for books
    const { status } = useParams();
    // useSetBooks hook for managing books state
    const useSetBooksHook = useSetBooks();
    
    
    //fetch all books for the user by satus
    const fetchBooks = async (param:string):Promise<void>  =>{
        try {
            const response = await axios.post(`${BASE_URL}/books/allbooks/status`,  
                {
                 user_id: user_id,
                 status: param
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

    // fetch all books by status on component mount
    useEffect(() => {
        if (status === 'reading') {
            setHeading('Currently reading:');
            fetchBooks('Reading')
        }
        else if (status === 'wanttoread') {
            setHeading('Want to read: ');
            fetchBooks('WantToRead')
        }
        else {
            setHeading('Finished reading: ');
            fetchBooks('Finished')
        }
    },[])
    
    
    return (
        <>
        <Navigation/>
        <h2>{heading}</h2>
        { useSelectorAllBooks()?.map(book => (
        <div>
        <Link to={`/book/${book.id}`}><img key={book.id} src={book.image} alt={book.title} /></Link>
        <p>{book.title}</p>
        <p>{book.authors}</p>
        </div> )) }
        {message}
        </>

    )
}

export default BooksByStatus;