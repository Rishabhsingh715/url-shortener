const express = require('express');
// const http = require('node:http');

const app = express();

// const server = new http.createServer(app);

app.get('/',(req, res)=>{
    console.log('request to server');
    res.json('time is awesome')
})

app.listen(3007,()=>{
    console.log('server is running on port 3007');
})