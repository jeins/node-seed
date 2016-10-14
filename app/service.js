import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

var app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/', (req, res)=>{
     res.json("OK");
});

app.server.listen('8888', 'localhost', ()=>{
    console.log("Listening on");
});