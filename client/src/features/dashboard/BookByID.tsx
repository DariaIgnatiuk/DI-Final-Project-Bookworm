import {useParams} from 'react-router-dom';
import { useState, useEffect} from 'react';
import axios from "axios";
import { BASE_URL } from '../../model/baseURL';
import { emptyBookExpanded } from '../../types';
import Navigation from '../navigation/Navigation';

const BookByID = () => {
    // get book id from params
    const { id } = useParams();
    // state for displaying error message
    const [message, setMessage] = useState('');
    const [book, setbook] = useState(emptyBookExpanded);

    //fetch all books for the user by satus
    const fetchBook = async ():Promise<void>  =>{
        try {
            const response = await axios.get(`${BASE_URL}/books/book/${id}`,  
                {withCredentials: true});
            //set the book state to the response data
            setbook(response.data);
        } catch (error:any) {
            // show the error message
            setMessage(error.response.data.message);
        }
    }

    // fetch all books by status on component mount
    useEffect(() => {
        fetchBook();
    },[])

    const wantToRead = () => {
        return (
        <div>
            <p>Want to Read</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            <h4>{book.authors}</h4>
            <p>Categories: {book.categories}</p>
            <p>Language: {book.language}</p>
            <p>Description: {book.description}</p>
        </div>
        )
    }

    const reading = () => {
        // calculating progress in %
        let progress:number = 0;
        if (book.pagecount && book.pagecount !=0 && book.reading_progress) {progress = (book.reading_progress / book.pagecount) * 100 }
        return (
        <div>
            <p>Reading</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            <h4>{book.authors}</h4>
            <p>Started: {book.date_start}</p>
            <p>Book Type: {book.booktype}</p>
            <p>{book.pagecount} {book.pagetype?.toLowerCase()}{(book.pagetype === 'Percentage')? <></>:<>s</>}</p>
            <p> Progress: {book.reading_progress} {book.pagetype?.toLowerCase()}{(book.pagetype === 'Percentage')? <></>:<>s</>}
                <div className="progress-bar">
                    <div className="progress-bar-green" style={{ width: `${progress}%` }}></div>
                </div> 
            </p>
            <p>Categories: {book.categories}</p>
            <p>Language: {book.language}</p>
            <p>Description: {book.description}</p>
        </div>
        )
    }

    const finished = () => {
        return (
            
        <div>
            <p>Finished</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            <h4>{book.authors}</h4>
            <p>Started: {book.date_start}</p>
            <p>Finished: {book.date_finish}</p>
            <p>My rating: {book.score}</p>
            <p>Book Type: {book.booktype}</p>
            <p>Categories: {book.categories}</p>
            <p>Language: {book.language}</p>
            <p>Description: {book.description}</p>
        </div>
        )
    }

    return (
        <>
        <Navigation/>
        {(message.length === 0)? 
        (book.status === "WantToRead")? wantToRead()
        : (book.status === "Reading")?  reading()
        : finished()
        : <div>{message}</div>}
        </>
    )
}

export default BookByID;