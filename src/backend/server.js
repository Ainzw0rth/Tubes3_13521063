const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Chat = require('/Users/Asus/OneDrive - Institut Teknologi Bandung/Documents/GitHub/Tubes3_13521063/src/models/chats');
const Knowledge = require('/Users/Asus/OneDrive - Institut Teknologi Bandung/Documents/GitHub/Tubes3_13521063/src/models/knowledge');
const chatsRoutes = require('../routes/chatsRoutes');
const knowRoutes = require('../routes/knowRoutes');

// express app
const app = express();

// middleware to handle json request body
app.use(express.json());

// add the Routes to the app
app.use('/chats', chatsRoutes);
app.use('/knowledges', knowRoutes);

// connect to database (MongoDB)
const dbURI = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

const newChat = new Chat({
    quest: "Salomo",
    respond: "Manalu"
});

Knowledge.findById('64515907e7b518998cc1b8a1')
  .then((knowledge) => console.log(knowledge))
  .catch((err) => console.log(err));
