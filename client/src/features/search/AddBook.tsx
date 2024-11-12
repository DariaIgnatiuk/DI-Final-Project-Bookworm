import { Link, useParams, useNavigate  } from "react-router-dom";
import { useEffect, useState, useRef } from 'react'
import Logout from "../loginRegister/Logout";
import axios from "axios";
import { BASE_URL } from "../../model/baseURL";
import { emptyBookExpanded } from "../../types";
import {checkScore} from '../../utils/validations'

const AddBook = () => {
    // state for displaying error message
    const [message, setMessage] = useState('');
    const [book, setBook] = useState(emptyBookExpanded);
    const [status, setStatus] = useState('');
    // getting book id from params
    const { id } = useParams();
    const navigate = useNavigate();
    // references for inputs
    const rateRef = useRef<HTMLInputElement>(null);
    const date_startRef = useRef<HTMLInputElement>(null);
    const date_finishRef = useRef<HTMLInputElement>(null);
    const booktypeRef = useRef<HTMLSelectElement>(null);
    const pagetypeRef = useRef<HTMLSelectElement>(null);
    const pagecountRef = useRef<HTMLInputElement>(null);


    // fetch all the information about the book from Google Book API on component mount
    const fetchBook = async ():Promise<void>  =>{
        try {
            const response = await axios.get(`${BASE_URL}/books/search/${id}`,  
                {withCredentials: true});
            //set the books state to the response data
            setBook(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

        // fetch the book on component mount
    useEffect(() => {
        fetchBook();
    },[])

    // add the book to DB
    const postBook = async ():Promise<void>  =>{
        try {
            const response = await axios.post(`${BASE_URL}/books/add`,  
                {
                    authors:book.authors , booktype:book.booktype, categories:book.categories, date_finish:book.date_finish, date_start: book.date_start,
                    description:book.description, image:book.image, language:book.language, pagecount:book.pagecount, pagetype:book.pagetype, publisher:book.publisher, 
                    reading_progress:book.reading_progress,score:book.score, status:book.status, title:book.title, user_id:localStorage.getItem('user_id')
                },
                {withCredentials: true});
            //set the books state to the response data
            setMessage(response.data);
        } catch (error:any) {
            console.log(error);
            // show the error message
            setMessage(error.message);
        }
    }

    // post book, show the success message and navitage to Dashboard
    const addBookToDB = () => {
            // request to add the book
            postBook();
            // show the success message and navigate to Dashboard after 1.5 seconds
            setTimeout(function() {
                navigate('/dashboard');
            }, 1500); 
        }
    
    // ONLY FOR FINISHED validates Finished books
    const statusFinishedValidateInput = () => {
        const score = Number(rateRef.current?.value);
        const date_start = date_startRef.current?.value.toString();
        const date_finish = date_finishRef.current?.value.toString();
        // check if score is valid
        if (score){
            if (!checkScore(score)) { setMessage('Score can not be higher than 5 or lower than 0')}
            else {book.score = score;}}
        // dates are not saved if they weren't filled in
        if (date_start) {book.date_start = date_start;}
        if (date_finish) {book.date_finish = date_finish;}
        addBookToDB();
    }
  
    // ONLY FOR FINISHED shows inputs for Finished books (rating, start and finish dates)
    const statusFinishedGetAdditionalInfo = () => {
        book.status = 'Finished';
        return (
            <div>
                <label>When did you start reading this book?  </label>
                <input type="date" ref={date_startRef}/><br/>
                <label>When did you finish reading this book?  </label>
                <input type="date" ref={date_finishRef}/> <br/>
                <label>How would you rate this book?  </label>
                <input ref={rateRef}placeholder="0..5"/> <br/>
                <button onClick={statusFinishedValidateInput}>Save</button>
            </div>
        )
    }

        // ONLY FOR READING validates Reading Now books
        const statusReadingValidateInput = () => {
            book.date_start = date_startRef.current?.value.toString();
            // if the user didn't set start date, it is set as current date
            if (!book.date_start) {
                const currentDate = new Date();
                book.date_start = currentDate.toLocaleDateString();
                }
            book.booktype = booktypeRef.current?.value;
            book.pagetype = pagetypeRef.current?.value;
            book.pagecount = Number(pagecountRef.current?.value);
            addBookToDB();
        }

    
    // ONLY FOR READING shows inputs for Reading Now books (start date, book type, number of pages)
    const statusReadingGetAdditionalInfo = () => {
            book.status = 'Reading';
            return (
                <div>
                    <label>When did you start reading this book?  </label>
                    <input type="date" ref={date_startRef}/><br/>
                    <label>What kind of book do you read?  </label>
                    <select id="book_type" ref={booktypeRef}>
                        <option value="Physical">Paper</option>
                        <option value="eBook">e-book</option>
                        <option value="Audiobook">Audiobook</option> 
                    </select><br/>
                    <label>How would you like to display your pages?  </label>
                    <select id="page_type" ref={pagetypeRef}>
                        <option value="Page">Page</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Episode">Episode</option> 
                    </select><br/>
                    <label>Total pages: </label>
                    <input type='text' ref={pagecountRef} /><br/>
                    <button onClick={statusReadingValidateInput}>Save</button>
                </div>
            )
        }

    // render the book into from server only if book id = 0 (so it fetched without errors) 
    const renderBook = () => {
        return (
            <div>
            {book.image ? (
                <img src={book.image} alt={book.title} />
                ) : (
                <img src="../../../Missing-book-cover.jpg" alt="Missing Book Cover" />
            )}
                <h2>{book.title}</h2>
                <h4>{book.authors}</h4>
                <p>{book.categories? (<>Categories: {book.categories}</>):<></> }</p>
                <p>{book.language? (<>Language: {book.language}</>):<></> }</p>
                <p >{book.description? (<>Description: {book.description}</>):<></> }</p>
                <button onClick={()=>{
                    book.status = 'WantToRead';
                    addBookToDB();
                }}>Add to the reading list</button>
                <button onClick={()=>{setStatus('Reading')}}>Start reading now</button>
                <button onClick={()=>{setStatus('Finished')}}>Mark as finished</button> 
            </div>

        )
    }

    return (
        <>
    <nav>
        <Link to='/books/search'><button>Back</button></Link>
        <Link to='dashboard'><button>Dashboard</button></Link>
        <Logout/>
    </nav>
    {(book.id === 0)? renderBook():<></> }
    {(status === 'Finished')? statusFinishedGetAdditionalInfo() :<></>}
    {(status === 'Reading')? statusReadingGetAdditionalInfo() :<></>}
    {message}
        </>
    )
}

export default AddBook