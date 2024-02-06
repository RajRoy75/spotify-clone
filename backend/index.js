const express = require('express');

const app = express();
const port = 8000;

app.get('/',(req,res)=>{
    res.send('Hello from express');
});

app.listen(port,()=>{
    console.log(`Express is running on port ${port}`);
})