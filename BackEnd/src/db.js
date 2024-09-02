import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.set("strictQuery",true)

async function main(){
    await mongoose.connect(
        `mongodb+srv://${process.env.USERDB}:${process.env.SENHADB}@clusterpi.nktnw.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPI`
    );
    console.log("Conectado com sucesso!")
}

main().catch((error) => console.log(error));

export default main;