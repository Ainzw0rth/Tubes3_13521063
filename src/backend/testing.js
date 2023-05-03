const mongoose = require('mongoose');
const Chat = require('/Users/Asus/OneDrive - Institut Teknologi Bandung/Documents/GitHub/Tubes3_13521063/src/models/chats');
const Knowledge = require('/Users/Asus/OneDrive - Institut Teknologi Bandung/Documents/GitHub/Tubes3_13521063/src/models/knowledge');
const chatsRoutes = require('../routes/chatsRoutes');
const knowRoutes = require('../routes/knowRoutes');
const knowQuery = require('../query/knowQuery');
const chatsQuery = require('../query/chatsQuery');
const algo = require('/Users/Asus/OneDrive - Institut Teknologi Bandung/Documents/GitHub/Tubes3_13521063/src/backend/Algorithm');

const dbURI = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

const chat = chatsQuery.getChats();
console.log(chat);
