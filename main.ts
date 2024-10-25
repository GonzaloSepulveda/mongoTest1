import { MongoClient } from 'mongodb'
import { BookModel, UserModel } from "./types.ts";
import { getUserModelFromUser } from "./utilities.ts";


const url = Deno.env.get("MONGO_URL");

if(!url){
    console.error("Necesitas mongo user"); 
    Deno.exit(-1);
}

const client = new MongoClient(url);
await client.connect();
console.info("Conectado");
const db = client.db("NebrijaDB"); 


const handler = async(req:Request):Promise<Response> => {
    const method = req.method;
    const url = new URL(req.url); 
    const path = url.pathname; 

    let users:UserModel[] = []
    if(method==="GET"){
        if(path==="/users"){
            const name = url.searchParams.get("name");
        }
        if(name){
            const users:UserModel[] = await UsersCollection.find({name: name}).toArray();
            const usersFinal = await Promise.all(users.map(async(u)=> await getUserModelFromUser(u,BooksCollection)));
            return new Response(JSON.stringify(usersFinal)); 
        }
        return new Response(JSON.stringify(users)); 
    }
}



const UsersCollection = db.collection<UserModel>("users");
const BooksCollection = db.collection<BookModel>("books");