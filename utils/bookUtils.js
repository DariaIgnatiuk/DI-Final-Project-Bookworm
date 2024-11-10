// Return the compressed books object instead of the original one and number of books found
export const compressBooks = (books) => {
    let result = {totalItems : books.totalItems, items:[]};
    for (const item of books.items) {
        const book = {
            id:item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            image: item.volumeInfo.imageLinks?.thumbnail
        }
        result.items.push(book);
    }
    return result; 
}

// Return the compressed single book
export const compressSingleBook = (book) => {
    const result = {
        authors: book.volumeInfo.authors.join(',  '),
        booktype: "Physical",
        categories: book.volumeInfo.categories.join(', '),
        date_finish: null,
        date_start: null,
        // deleting all html tags from the book description
        description: book.volumeInfo.description.replace(/<[^>]*>/g, ''),
        image: book.volumeInfo.imageLinks.thumbnail,
        language: book.volumeInfo.language,
        pagecount: book.volumeInfo.pageCount,
        pagetype:  'Page',
        publisher:  book.volumeInfo.publisher,
        reading_progress: null,
        score: null,
        status: null,
        title: book.volumeInfo.title,
        id:0
    }
    return result; 
}