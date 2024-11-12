export interface UserInterface {
    id: number, 
    email: string, 
    first_name: string,
    family_name: string,
    username: string
}

export interface bookSmall {
    id:number,
    title: string, 
    authors: string | null,
    image: string, 
    status: string,
    reading_progress: string | null
}

export const bookSmallEmpty:bookSmall = {
    id: 0,
    title: '', 
    authors: '',
    image: '', 
    status: '',
    reading_progress: ''
}

export interface bookExpanded {
    authors:  string | null| string[],
    booktype: string | null | undefined,
    categories: string | null | string[],
    date_finish: string | null | undefined,
    date_start: string | null | undefined,
    description: string | null,
    id: number,
    image: string,
    language: string | null,
    pagecount: number,
    pagetype: string | null | undefined,
    publisher: string | null,
    reading_progress: number,
    score: number | null,
    status: string | null,
    title: string,
}

export const emptyBookExpanded: bookExpanded= {
    authors: [''],
    booktype: null,
    categories: [''],
    date_finish: null,
    date_start: null,
    description: null,
    id: -1,
    image: '',
    language: null,
    pagecount: 0,
    pagetype:  null,
    publisher:  null,
    reading_progress: 0,
    score: null,
    status: null,
    title: '',
}

export interface SingleBookCompressed {
    id: string
    title: string
    authors: string[]
    image: string | undefined
}

export const BooksCompressedEmpty = {
            id: '',
            title: '',
            authors: [],
            image: ''
        
}