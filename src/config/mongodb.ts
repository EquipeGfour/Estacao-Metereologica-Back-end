import mongodb from 'mongodb'
import * as dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI || '';
const client = new mongodb.MongoClient(URI, { useUnifiedTopology: true });
let medidaCollection;
const connectMongoDb = async () => {
    try{
        await client.connect();
        const db = client.db('EstacaoMeteorologia');
        medidaCollection = db.collection('medidas');
        console.log("Conexão estabelecida com o Mongodb....");
    }catch(error){
        console.error(error);
    }
}
export {connectMongoDb,medidaCollection}