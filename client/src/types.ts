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
    reading_progress: number,
    pagecount: number,
    score: number | null,
}

export const bookSmallEmpty:bookSmall = {
    id: 0,
    title: '', 
    authors: '',
    image: '', 
    status: '',
    reading_progress: 0,
    pagecount: 0,
    score: 0,
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
    score: 0,
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

export interface Reviews {
    id: number,
    title: string,
    authors:string | null,
    score:number,
    image:string
}

export const emptyReview:Reviews = {
    id: 0,
    title: '',
    authors:'',
    score:0,
    image:''
}

export interface ReviewFull {
    id: number,
    title: string,
    authors: string | null,
    score: number,
    image: string,
    summary: string,
    thoughts: string,
    quotes: string,
    favorite_character: string,
    why_favorite_character: string,
    favorite_scene: string,
    why_favorite_scene: string,
    rating_hearts: number,
    rating_fire: number,
    rating_tears: number,
    book_id:number
}

export const emptyReviewFull: ReviewFull = {
    id: 0,
    title: '',
    authors: '',
    score: 0,
    image: '',
    summary: '',
    thoughts: '',
    quotes: '',
    favorite_character: '',
    why_favorite_character: '',
    favorite_scene: '',
    why_favorite_scene: '',
    rating_hearts: 0,
    rating_fire: 0,
    rating_tears: 0,
    book_id:0
}