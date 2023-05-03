const mongoose = require('mongoose');
const Knowledge = require('../models/knowledge');

mongoose.connect('mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const newKnowledge1 = new Knowledge({
  question: "Apa ibukota Indonesia?",
  answer: "Ibukota Indonesia adalah Jakarta"
});

const newKnowledge2 = new Knowledge({
    question: "Apa mata kuliah IF semester 4 yang paling seru?",
    answer: "Yang paling seru adalah STIMA tentunya :D"
  });

newKnowledge1.save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

newKnowledge2.save()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
