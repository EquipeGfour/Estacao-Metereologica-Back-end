import { medidaCollection } from "../config/mongodb";

const buscarMedidas = async ()  => {
    try{
        const results = await medidaCollection.find().toArray();
        return results
    }catch(error){
        console.log(error);
        throw error;
    }
}

export { buscarMedidas };