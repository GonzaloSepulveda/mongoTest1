import type { Collection } from "mongodb";
import type { Book, BookModel, User, UserModel } from "./types.ts";

export const getUserModelFromUser = async(
    userIn:UserModel,
    BooksCollection:Collection<BookModel>,
):Promise<User> => {
    const booksIDs = userIn.books;

    const books = await BooksCollection.find({_id:{$in:booksIDs}}).toArray();


    return {
        name:userIn.name,
        age: userIn.age,
        id:userIn._id.toString(),
        books: books.map(b => getBookFromModel(b))
    }
}; 


const getBookFromModel = (bookIn:BookModel):Book => ({
    id: bookIn._id.toString(),
    title: bookIn.title,
    pages:bookIn.pages,
})