export class Book {
    id:  number;
    title : string;
    description: string;
    author: string;
    publisher: string;
    genre: string;


    constructor(id = 0, title='', description = '', author = '', publisher ='', genre ='') {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author =  author;
        this.publisher = publisher;
        this.genre = genre;
    }

}