const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
const dbName = 'Chatbot';

// fungsi untuk mengambil semua data knowledge
async function getAllKnowledge() {
  const db = await connect();
  const knowledge = await db.collection('knowledges').find().toArray();
  return knowledge;
}

// fungsi untuk mengambil satu data knowledge berdasarkan id
async function getKnowledgeById(id) {
  const db = await connect();
  const knowledge = await db.collection('knowledges').findOne({ _id: ObjectId(id) });
  return knowledge;
}

// fungsi untuk menambahkan data knowledge
async function addKnowledge(newKnowledge) {
  const db = await connect();
  const result = await db.collection('knowledges').insertOne(newKnowledge);
  return result.insertedId;
}

// fungsi untuk mengupdate data knowledge berdasarkan id
async function updateKnowledgeById(id, updatedKnowledge) {
  const db = await connect();
  const result = await db.collection('knowledges').updateOne({ _id: ObjectId(id) }, { $set: updatedKnowledge });
  return result.modifiedCount;
}

// fungsi untuk menghapus data knowledge berdasarkan id
async function deleteKnowledgeById(id) {
  const db = await connect();
  const result = await db.collection('knowledges').deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
}

async function deleteByQuestion(question) {
    try {
      const result = await Knowledge.deleteOne({ question });
      console.log(`Deleted ${result.deletedCount} knowledge(s) with question "${question}"`);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
    }
};

module.exports = {
    getAllKnowledge,
    getKnowledgeById,
    addKnowledge,
    updateKnowledgeById,
    deleteKnowledgeById,
    deleteByQuestion
};
