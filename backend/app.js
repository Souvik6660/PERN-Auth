import express from 'express';
import expressSession from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import authRoute from './Routes/authRoute.js';
import todoRoute from './Routes/todoRoute.js';
import googleRoute from './Routes/googleRoute.js';
import './utils/Scheduledeletion.js'
import passport from 'passport';

config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


const corsOption = {
  origin:"http://localhost:5173",
  credentials:true,
  methods:['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders:['content-type', 'Authorization']
}

app.use(cors(corsOption));

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());



app.use('/',googleRoute);
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',todoRoute);

app.use('/ping', (req, res) => {
    res.send('HELL !!!  I AM RUNNING');
  });

    // 404 handler
app.all('*', (req, res) => {
    res.status(404).send('Oops! 404 page not found');
  });


export default app;

/**
 * Dependencies must intall
 * 
 * npm i @reduxjs/toolkit
 *
 * npm i react-redux
 * 
 * redux-persist
 * 
 * universal-cookie
 * 
 */