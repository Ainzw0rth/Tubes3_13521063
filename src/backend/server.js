const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const chatsRoutes = require('../routes/chatsRoutes');
const chatsQuery = require('../query/chatsQuery');
const knowRoutes = require('../routes/knowRoutes');
const knowQuery = require('../query/knowQuery');

// express app
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// middleware to handle json request body
app.use(express.json());

// add the Routes to the app
app.use('/chats', chatsRoutes);
app.use('/knowledge', knowRoutes);

// connect to database (MongoDB)
const dbURI = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));
