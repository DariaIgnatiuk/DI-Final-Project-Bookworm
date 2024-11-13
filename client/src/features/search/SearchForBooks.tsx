import Navigation from "../navigation/Navigation";
import { useRef, useState } from 'react';
import axios from "axios";
import { BASE_URL } from '../../model/baseURL';
import {BooksCompressedEmpty} from '../../types';
import { Link } from "react-router-dom";

const SearchForBooks = () => {
    // using useRef hook to create ref for each input field
    const titleRef = useRef<HTMLInputElement>(null);
    const authorsRef = useRef<HTMLInputElement>(null);
    // using useState hook to save the message 
    const [message, setMessage] = useState('');
    const [books, setBooks] = useState([[BooksCompressedEmpty]]);
    // index for pagination
    const [index, setIndex] = useState(-1);
    const [totalItems, setTotalItems] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [maxPages, setMaxPages] = useState(0)

    const fetchBooks = async():Promise<void> => {
        setMessage('');
        setBooks([[BooksCompressedEmpty]]);
        const title = titleRef.current?.value;
        const authors = authorsRef.current?.value;
        setSearchQuery(title + " " + authors)
        if (title || authors) {
            try {
                
                    const response = await axios.post(`${BASE_URL}/books/search`,  
                        {
                         title: title,
                         authors: authors
                        },
                        {withCredentials: true});
                    // check if there are any books
                    if (response.data.totalItems > 0) {
                        setTotalItems(true);
                        setIndex(0);
                    } else {
                        setTotalItems(false);
                        setIndex(-1);
                    }
                    if (response.data.totalItems > 40) {setMaxPages(3)}
                    else {setMaxPages(response.data.totalItems/10)}
                    
                    //set the books state to the response data
                    // divide books in chunks of 10 items for pagination
                    const chunks = [];
                    for (let i = 0; i < response.data.items.length; i += 10) {
                        chunks.push(response.data.items.slice(i, i + 10));
                      }
                    setBooks(chunks);  
                } catch (error:any) {
                    console.log(error);
                    setTotalItems(false);
                    setIndex(-1);
                    // show the error message
                    setMessage(error.response.data.message);          
            } 
        }
        else setMessage("'Title' or 'Author' must be filled in")
        
    }

    const displayBooks = () => {
        return (
        
            books[index].map(book => (
                <div key={book.id} className="bookCardMedium">
            {book.image ? (
                <div className="cardMediumImageContainer"> <img src={book.image}  className="mediumImage"alt={book.title} /> </div>
                ) : (
                    <div className="cardMediumImageContainer"> <img src="../../../Missing-book-cover.jpg"  className="mediumImage" alt="Missing Book Cover" /> </div>
            )}
            <div >
                    <p className="mediumCardTitle">{book.title}</p>
                    <p className="mediumCardAuthor">{book.authors}</p>
                    <Link to={`/books/search/${book.id}`}><button className='buttonAdd'>Add</button></Link>
                    </div>
                </div>
            ))
            
        )
    }

    const previousPage = () => {
        setIndex(index - 1);
        window.scrollTo(0, window.innerHeight / 2);
    }

    const nextPage = () => { 
        setIndex(index + 1);
        window.scrollTo(0, window.innerHeight / 2);
    }

    const enter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.keyCode === 13) {
            fetchBooks();
        }
    }

    return (
        <>
        <Navigation/>
        <div className='main'>
        <h3>Search</h3>
        <div className='inputsDiv'>
        <input ref={titleRef} className='inputsSearch'  placeholder="Title"/> <br/>
        <input ref={authorsRef} className='inputsSearch' placeholder="Author"/> <br/>
        </div>
        <button onClick={fetchBooks} onKeyUp={(event) => enter(event)}className='button' >Find books</button><br/>
        {searchQuery?(<p className='searchQuery'>You are searching for: <b><i>{searchQuery}</i></b></p>) :<></>}
        {(totalItems)? <div className="mainByStatus">{displayBooks()}</div>:<></>}
        <div className="buttonPervNext">
        {(index >= 1) && (index <= maxPages)? (<button className='button' onClick={previousPage}>Previous</button>): <></>}
        {(index >= 0) && (index <= maxPages - 1)? (<button className='button' onClick={nextPage}>Next</button>): <></>}
        </div>
        <div className='errorMessage'>{message}</div>
        </div>
        </>
    )
}

export default SearchForBooks;