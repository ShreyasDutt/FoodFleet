import express from 'express';
import mongoDB from "./db.js"
import createUser from "./Routes/CreateUser.js";
import DisplayData from "./Routes/DisplayData.js";
import OrderData from "./Routes/OrderData.js";


const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
})
app.use(express.json());
app.use('/api',createUser);
app.use('/api',DisplayData);
app.use('/api',OrderData);


mongoDB(); //Connect to MongoDB


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})