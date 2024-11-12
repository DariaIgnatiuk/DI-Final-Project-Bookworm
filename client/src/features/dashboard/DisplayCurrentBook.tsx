import { useSelectorCurrentBook} from './state/hooks.js';
import EditWantToRead from './EditWantToRead.js';
import EditFinished from './EditFinished.js';
import EditReading from './EditReading.js';

const DisplayCurrentBook = () => {
    const book = useSelectorCurrentBook();

    const wantToRead = () => {
        return (
        <div>
            <p>Want to Read</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            {(book.authors)?(<h4>{book.authors}</h4>):<></>}
            {(book.categories)?(<p>Categories: {book.categories}</p>):<></>}
            {(book.language)?(<p>Language: {book.language}</p>):<></>}
            {(book.description)?(<p>Description: {book.description}</p>):<></>}
            <EditWantToRead/>
        </div>
        )
    }

    const reading = () => {
        // calculating progress in %
        let progress:number = 0;
        if (book.pagecount && book.pagecount !=0 && book.reading_progress) {progress = (book.reading_progress / book.pagecount) * 100 }
        return (
        <div>
            <p>Reading now</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            {(book.authors)?(<h4>{book.authors}</h4>):<></>}
            {(book.date_start)?(<p>Started: {book.date_start}</p>):<></>}
            <p>Book Type: {book.booktype}</p>
            <p>{book.pagecount} {book.pagetype?.toLowerCase()}{(book.pagetype === 'Percentage')? <></>:<>s</>}</p>
            <p>Read {book.pagetype?.toLowerCase()}{(book.pagetype === 'Percentage')? <></>:<>s</>}: {book.reading_progress} / {book.pagecount}
                <div className="progress-bar">
                    <div className="progress-bar-green" style={{ width: `${progress}%` }}></div>
                </div> 
            </p>
            {(book.categories)?(<p>Categories: {book.categories}</p>):<></>}
            {(book.language)?(<p>Language: {book.language}</p>):<></>}
            {(book.description)?(<p>Description: {book.description}</p>):<></>}
            <EditReading/>
        </div>
        )
    }

    const finished = () => {
        return (
            
        <div>
            <p>Finished</p>
            <img src={book.image}/>
            <h2>{book.title}</h2>
            {(book.authors)?(<h4>{book.authors}</h4>):<></>}
            {(book.date_start)?(<p>Started: {book.date_start}</p>):<></>}
            {(book.date_finish)?( <p>Finished: {book.date_finish}</p>):<></>}

            {(book.score)?(<p>My rating: {book.score}</p>):<></>}
            <p>Book Type: {book.booktype}</p>
            {(book.categories)?(<p>Categories: {book.categories}</p>):<></>}
            {(book.language)?(<p>Language: {book.language}</p>):<></>}
            {(book.description)?(<p>Description: {book.description}</p>):<></>}
            <EditFinished/>
        </div>
        )
    }

    return (
        <>
            {(book.status === "WantToRead")? wantToRead()
            : (book.status === "Reading")?  reading()
            : (book.status === "Finished")? finished()
            : <></>}
        </>

    )
}

export default DisplayCurrentBook