// routes/messagesRoute.js

const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST route to handle form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a new message document
    const newMessage = new Message({
      name,
      email,
      message
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while saving the message' });
  }
});

// GET route to fetch all messages
router.get('/getallmessages', async (req, res) => {
  try {
    // Fetch all messages from the database
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages' });
  }
});

router.delete('/:messageId', async (req, res) => {
  try {
    const messageId = req.params.messageId;

    // Find the message by ID and delete it
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'An error occurred while deleting the message' });
  }
});

module.exports = router;
