import { useParams } from 'react-router-dom';
import { useEffect} from 'react';
import axios from "axios";
import { BASE_URL } from '../../model/baseURL';
import Navigation from '../navigation/Navigation';
import {useSetMessage, useSelectorMessage, useSetCurrentBook} from './state/hooks.js';
import DisplayCurrentBook from './DisplayCurrentBook.js';

const BookByID = () => {
    // get book id from params
    const { id } = useParams();
    const useSetMessageHook = useSetMessage();
    const useSetCurrentBookHook = useSetCurrentBook();

    //fetch all books for the user by satus
    const fetchBook = async ():Promise<void>  =>{
        try {
            const response = await axios.get(`${BASE_URL}/books/book/${id}`,  
                {withCredentials: true});
            //set the book state to the response data
            useSetCurrentBookHook(response.data);
        } catch (error:any) {
            // show the error message
            useSetMessageHook(error.response.data.message)
        }
    }

    // fetch all books by status on component mount
    useEffect(() => {
        useSetMessageHook('');
        fetchBook();
    },[])

    return (
        <>
        <Navigation/>
        <div className='main'>
        <div  className="errorMessage">{useSelectorMessage()}</div>
        <DisplayCurrentBook/>
        
        </div>
        </>
    )
}

export default BookByID;