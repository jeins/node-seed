import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import Middleware from './Middleware';

var app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(Middleware.enableCors);

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use('/', (req, res)=>{
     res.json("OK");
});

app.server.listen('8888', 'localhost', ()=>{
    console.log("Listening on");
});

export default app;