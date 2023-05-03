const mongoose = require('mongoose');
const Knowledge = require('../models/knowledge');
const knowQuery = require('../query/knowQuery');

mongoose.connect('mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const knowledge1 = new Knowledge({
    question: 'Hapus pertanyaan {question}',
    answer: 'Pertanyaan {question} telah dihapus'
});

const knowledge2 = new Knowledge({
    question: 'Hapus pertanyaan {question}',
    answer: 'Tidak ada pertanyaan {question}'
});

knowQuery.addKnowledge(knowledge1);
knowQuery.addKnowledge(knowledge2);
