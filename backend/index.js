const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const port = 8000;
const mongoDb = `mongodb+srv://rajroy:${process.env.MONGO_PASSWORD}@cluster0.etidfhl.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongoDb).then((x)=>{
    console.log('mongoDB atlas successfully connected to express Js')
}).catch((err)=>{
    console.error(err);
})

app.get('/',(req,res)=>{
    res.send('Hello from express');
});

app.listen(port,()=>{
    console.log(`Express is running on port ${port}`);
})