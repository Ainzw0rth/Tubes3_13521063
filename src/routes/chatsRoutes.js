const express = require('express');
const Chat = require('../models/chats');
const { getChats, getChatById, addChat, deleteChatById, giveRespond } = require('../query/chatsQuery');
const router = express.Router();

// GET all chats
router.get('/', async (req, res) => {
  try {
    const chats = await getChats();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single chat by ID
router.get('/:id', async (req, res) => {
  try {
    const chat = await getChatById(req.params.id);
    if (chat == null) {
      return res.status(404).json({ message: 'Cannot find chat' });
    }
    res.json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new chat
router.post('/', async (req, res) => {
  const chat = new Chat({
    message: req.body.message,
    is_bot_message: req.body.is_bot_message
  });
  try {
    const newChat = await addChat(chat);
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an existing chat by ID
router.delete('/:id', async (req, res) => {
  try {
    const chat = await deleteChatById(req.params.id);
    if (chat == null) {
      return res.status(404).json({ message: 'Cannot find chat' });
    }
    res.json({ message: 'Deleted chat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new chat and get response from bot
router.post('/answer', async (req, res) => {
  try {
    const response = await giveRespond(req.body.message);

    const newChat = new Chat({
      message: req.body.message,
      is_bot_message: false
    });
    await addChat(newChat);

    const botResponse = new Chat({
      message: response,
      is_bot_message: true
    });
    await addChat(botResponse);

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
