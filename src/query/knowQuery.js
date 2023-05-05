const { MongoClient, ObjectId } = require('mongodb');
const Knowledge = require('../models/knowledge');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
const dbName = 'chatbotweb';

async function connect() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    return db;
};

// fungsi untuk mengambil semua data knowledge
async function getAllKnowledge() {
  const db = await connect();
  const knowledge = await db.collection('knowledges').find().toArray();
  return knowledge;
};

// fungsi untuk mengambil satu data knowledge berdasarkan id
async function getKnowledgeById(id) {
  const db = await connect();
  const knowledge = await Knowledge.findOne({_id: new mongoose.Types.ObjectId(id)});
  return knowledge;
};

// fungsi untuk mengambil satu data knowledge berdasarkan question
async function getKnowledgeByQuestion(question) {
    const db = await connect();
    const knowledge = await db.collection('knowledges').findOne({ question: question });
    return knowledge;
};

// fungsi untuk menambahkan data knowledge
async function addKnowledge(newKnowledge) {
  const db = await connect();
  const result = await db.collection('knowledges').insertOne(newKnowledge);
  return result.insertedId;
};

// fungsi untuk mengupdate data knowledge berdasarkan question
async function updateKnowledgeByQuestion(question, updatedAnswer) {
  const db = await connect();
  const result = await db.collection('knowledges').updateOne({ question: question }, { $set: { answer: updatedAnswer } });
  return result.modifiedCount;
};


// fungsi untuk menghapus data knowledge berdasarkan id
async function deleteKnowledgeById(id) {
  const db = await connect();
  const result = await db.collection('knowledges').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};

async function deleteByQuestion(question) {
    try {
      const result = await Knowledge.deleteOne({ question: question });
      console.log(`Deleted ${result.deletedCount} knowledge(s) with question "${question}"`);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
    }
};

async function isQuestionExist(question) {
  const db = await connect();
  const knowledge = await db.collection('knowledges').findOne({ question: question });
  return knowledge !== null;
};

// fungsi untuk mendapatkan semua question dari collection knowledge
async function getAllQuestions() {
  const db = await connect();
  const questions = await db.collection('knowledges').distinct('question');
  return questions;
};

// fungsi untuk mendapatkan semua answer dari collection knowledge
async function getAllAnswers() {
  const db = await connect();
  const answers = await db.collection('knowledges').distinct('answer');
  return answers;
};

async function getQuestionAndAnswer() {
  const db = await connect();
  const result = await db.collection('knowledges').find({}, { projection: { _id: 0, question: 1, answer: 1 } }).toArray();
  return result.map(({ question, answer }) => [question, answer]);
}

module.exports = {
    getAllKnowledge,
    getKnowledgeById,
    getKnowledgeByQuestion,
    addKnowledge,
    updateKnowledgeByQuestion,
    deleteKnowledgeById,
    deleteByQuestion,
    isQuestionExist,
    getAllQuestions,
    getAllAnswers,
    getQuestionAndAnswer
};
