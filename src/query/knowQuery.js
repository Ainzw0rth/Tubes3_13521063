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
  const knowledge = await Knowledge.findById(new mongoose.Types.ObjectId(id));
  return knowledge;
};

// fungsi untuk mengambil satu data knowledge berdasarkan question
async function getKnowledgeByQuestion(question) {
    const db = await connect();
    const knowledge = await db.collection('knowledges').findOne({ quest: question });
    return knowledge;
};

// fungsi untuk menambahkan data knowledge
async function addKnowledge(newKnowledge) {
  const db = await connect();
  const result = await db.collection('knowledges').insertOne(newKnowledge);
  return result.insertedId;
};

// fungsi untuk mengupdate data knowledge berdasarkan id
async function updateKnowledgeById(id, updatedKnowledge) {
  const db = await connect();
  const result = await db.collection('knowledges').updateOne({ _id: ObjectId(id) }, { $set: updatedKnowledge });
  return result.modifiedCount;
};

// fungsi untuk menghapus data knowledge berdasarkan id
async function deleteKnowledgeById(id) {
  const db = await connect();
  const result = await db.collection('knowledges').deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
};

async function deleteByQuestion(question) {
    try {
      const result = await Knowledge.deleteOne({ question });
      console.log(`Deleted ${result.deletedCount} knowledge(s) with question "${question}"`);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
    }
};

async function isQuestionExist(question) {
  const db = await connect();
  const knowledge = await db.collection('knowledges').findOne({ quest: question });
  return knowledge !== null;
};

module.exports = {
    getAllKnowledge,
    getKnowledgeById,
    getKnowledgeByQuestion,
    addKnowledge,
    updateKnowledgeById,
    deleteKnowledgeById,
    deleteByQuestion,
    isQuestionExist
};
