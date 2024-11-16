// Return the compressed books object instead of the original one and number of books found
const compressBooks = (books) => {
  let result = { totalItems: books.totalItems, items: [] };
  for (const item of books.items) {
    const book = {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      image: item.volumeInfo.imageLinks?.thumbnail,
    };
    result.items.push(book);
  }
  return result;
};

// Return the compressed single book
const compressSingleBook = (book) => {

  
  let categories = undefined;
  if (book.volumeInfo.categories) categories = book.volumeInfo.categories.join(", ");
  let authors = undefined;
  if (book.volumeInfo.authors) authors = book.volumeInfo.authors.join(", ");
  let description = undefined;
  if (book.volumeInfo.description) description = book.volumeInfo.description.replace(/<[^>]*>/g, "");
  let result = {
    authors: authors,
    booktype: "Physical",
    categories: categories,
    date_finish: null,
    date_start: null,
    // deleting all html tags from the book description
    description: description,
    image: book.volumeInfo.imageLinks.thumbnail,
    language: book.volumeInfo.language,
    pagecount: book.volumeInfo.pageCount,
    pagetype: "Page",
    publisher: book.volumeInfo.publisher,
    reading_progress: 0,
    score: null,
    status: null,
    title: book.volumeInfo.title,
    id: 0,
  };
  if (!result.pagecount) result.pagecount = 0;
  return result;
};

module.exports = {
  compressBooks,
  compressSingleBook,
};
