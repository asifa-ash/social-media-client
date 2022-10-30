 import express from 'express';
 import bodyParser from 'body-parser';
 import mongoose from 'mongoose';
 import  cors from 'cors'
// const bodyParser = require("body-parser");
// const express = require("express");
import userModel from './Model/UserModel.mjs'
import UserRoute from './Routes/UserRoute.mjs'
import AuthRouter from './Routes/AuthRoute.mjs'
import postRoute from './Routes/postRoute.mjs'
import uploadRoute from './Routes/uploadRoute.mjs'
// Router





const app = express();
// to serve image for public
app.use(express.static('public'))
app.use('/images',express.static('images'))



// midleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors())
app.get("/", (req, res) => {
  console.log('hi')
 
  userModel.updateOne({ name: "asifa" }, { username: 'hello' },()=>{
    console.log('hello')
  });
});

app.listen(4000, (po) => {});




// usage of Routes
app.use('/auth',AuthRouter)
app.use('/user',UserRoute)
app.use('/post',postRoute)
app.use('/upload',uploadRoute)

  


