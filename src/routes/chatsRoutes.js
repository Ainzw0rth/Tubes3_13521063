const express = require('express');
const Chat = require('../models/chats');
const { getChats, getChatById, getChatByQuestion, addChat, deleteChatById } = require('../query/chatsQuery');

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

// GET a single chat by question
router.get('/:quest', async (req, res) => {
    try {
      const chat = await getChatByQuestion(req.params.quest );
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
    quest: req.body.quest,
    respond: req.body.respond
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

module.exports = router;
