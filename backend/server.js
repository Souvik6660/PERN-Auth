import app from "./app.js";
import { DbConnection } from "./db/dbConnection.js";


const PORT = process.env.PORT ||5000 ;

app.listen(PORT,async()=>{
    await DbConnection();
     console.log(`PERN App is running at ${PORT}`);
});