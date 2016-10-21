import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import corsMiddleware from './middleware/cors';
import UserRoute from './application/User/Route';
import ProductRoute from './application/Product/Route';
import PurchaseRoute from './application/Purchase/Route';

var app = express();
app.server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(corsMiddleware);

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use('/', UserRoute());
app.use('/', ProductRoute());
app.use('/', PurchaseRoute());
app.use('/', (req, res, next)=>{
    var err = new Error('Not Found');
    err.status = 404;
    next(err.message);
});

app.server.listen('8888', 'localhost', ()=>{
    console.log("Listening on");
});

export default app;