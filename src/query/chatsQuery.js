const { MongoClient, ObjectId } = require('mongodb');

// definisikan konfigurasi koneksi ke database
const uri = 'mongodb+srv://13521063:ngechatgpt@chatbot.ynjyvpn.mongodb.net/chatbotweb';
const dbName = 'chatbotweb';

// buat fungsi untuk mendapatkan data chats
async function getChats() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('chats');
  const chats = await collection.find().toArray();
  await client.close();
  return chats;
};

// buat fungsi untuk mendapatkan data chat berdasarkan ID
async function getChatById(id) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('chats');
  const chat = await collection.findOne({ _id: ObjectId(id) });
  await client.close();
  return chat;
};

// buat fungsi untuk mendapatkan data chat berdasarkan pertanyaan
async function getChatByMsg(msg) {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('chats');
    const chat = await collection.findOne({ message: msg });
    await client.close();
    return chat;
};

// Mendapatkan semua chat yang bukan merupakan bot message
async function getUserMessages() {
  const db = await connect();
  const chats = await db.collection('chats').find({ is_bot_message: false }).toArray();
  return chats;
};

// Mendapatkan semua bot message
async function getBotMessages() {
  const db = await connect();
  const chats = await db.collection('chats').find({ is_bot_message: true }).toArray();
  return chats;
};

// buat fungsi untuk menambah data chat baru
async function addChat(chat) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('chats');
  const result = await collection.insertOne(chat);
  await client.close();
  return result;
};

// buat fungsi untuk menghapus data chat berdasarkan ID
async function deleteChatById(id) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('chats');
  const result = await collection.deleteOne({ _id: ObjectId(id) });
  await client.close();
  return result;
};

// ekspor semua fungsi yang telah dibuat
module.exports = {
  getChats,
  getChatById,
  getChatByMsg,
  getUserMessages,
  getBotMessages,
  addChat,
  deleteChatById
};
