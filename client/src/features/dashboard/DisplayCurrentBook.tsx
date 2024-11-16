import { useSelectorCurrentBook } from "./state/hooks.js";
import EditWantToRead from "./EditWantToRead.js";
import EditFinished from "./EditFinished.js";
import EditReading from "./EditReading.js";
import DeleteBook from "./DeleteBook.js";

const DisplayCurrentBook = () => {
  const book = useSelectorCurrentBook();

  const wantToRead = () => {
    return (
      <div className="bookCardBig">
        <div className="bookCardBigImage">
          <img className="bigImage" src={book.image} />
          <br />
          <br />
          <EditWantToRead />
          <DeleteBook />
        </div>
        <div>
          <div className="titleAndStatusContainer">
            <h2>{book.title}</h2>
            <img className="statusBarBig" src="/statusWantToRead.png" />
          </div>
          {book.authors ? <h4>{book.authors}</h4> : <></>}
          {book.categories ? (
            <p>
              <span className="bookCardBigInfo">Categories: </span>
              {book.categories}
            </p>
          ) : (
            <></>
          )}
          {book.language ? (
            <p>
              <span className="bookCardBigInfo">Language: </span>
              {book.language}
            </p>
          ) : (
            <></>
          )}
          {book.description ? (
            <p className="description">
              <span className="bookCardBigInfo">Description: </span>
              {book.description}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const reading = () => {
    // calculating progress in %
    let progress: number = 0;
    if (book.pagecount && book.pagecount != 0 && book.reading_progress) {
      progress = (book.reading_progress / book.pagecount) * 100;
    }
    return (
      <>
        <div className="bookCardBig">
          <div className="bookCardBigImage">
            <img className="bigImage" src={book.image} />
            <br />
            <br />
            <EditReading />
            <DeleteBook />
          </div>
          <div>
            <div className="titleAndStatusContainer">
              <h2>{book.title}</h2>
              <img className="statusBarBig" src="/statusReading.png" />
            </div>
            {book.authors ? <h4>{book.authors}</h4> : <></>}
            {book.date_start ? (
              <p>
                <span className="bookCardBigInfo">Started: </span>
                {book.date_start}
              </p>
            ) : (
              <></>
            )}
            <p>
              <span className="bookCardBigInfo">Book Type: </span>
              {book.booktype}
            </p>
            <p>
              <span className="bookCardBigInfo">Read </span>
              {book.pagetype?.toLowerCase()}
              {book.pagetype === "Percentage" ? <></> : <>s</>}:{" "}
              {book.reading_progress} / {book.pagecount}
              <div className="progress-bar">
                <div
                  className="progress-bar-green"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </p>
            {book.categories ? (
              <p>
                <span className="bookCardBigInfo">Categories: </span>
                {book.categories}
              </p>
            ) : (
              <></>
            )}
            {book.description ? (
              <p className="description">
                <span className="bookCardBigInfo">Description: </span>
                {book.description}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  };

  const returnScore = (score:number) => {
    const numbers = [1, 2, 3, 4, 5];
    return numbers.map((num) =>
        num <= score ? (
          <img
            className="imgIcon"
            src="../../../rating/star.svg"
          />
        ) : (
          <img
            className="imgIcon"
            src="../../../rating/emptyStar.svg"
          />
        )
      );
    };

  const finished = () => {
    return (
      <div className="bookCardBig">
        <div className="bookCardBigImage">
          <img className="bigImage" src={book.image} />
          <br />
          <br />
          <EditFinished />
          <DeleteBook />
        </div>
        <div>
          <div className="titleAndStatusContainer">
            <h2>{book.title}</h2>
            <img className="statusBarBig" src="/statusFinished.png" />
          </div>
          {book.authors ? <h4>{book.authors}</h4> : <></>}
          {book.date_start ? (
            <p>
              <span className="bookCardBigInfo">Started: </span>
              {book.date_start}
            </p>
          ) : (
            <></>
          )}
          {book.date_finish ? (
            <p>
              <span className="bookCardBigInfo">Finished: </span>{" "}
              {book.date_finish}
            </p>
          ) : (
            <></>
          )}
          {book.score ? (
            <p>
              <span className="bookCardBigInfo">My rating: </span>     {returnScore(book.score)}
            </p>
          ) : (
            <></>
          )}
          <p>
            <span className="bookCardBigInfo">Book Type: </span>
            {book.booktype}
          </p>
          {book.categories ? (
            <p>
              <span className="bookCardBigInfo">Categories: </span>
              {book.categories}
            </p>
          ) : (
            <></>
          )}
          {book.description ? (
            <p className="description">
              <span className="bookCardBigInfo">Description: </span>
              {book.description}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {book.status === "WantToRead" ? (
        wantToRead()
      ) : book.status === "Reading" ? (
        reading()
      ) : book.status === "Finished" ? (
        finished()
      ) : (
        <></>
      )}
    </>
  );
};

export default DisplayCurrentBook;
