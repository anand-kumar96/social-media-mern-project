const ChatModel = require('../models/chatModel')

exports.createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  })
  try {
    const result = await newChat.save()
    res.status(200).json({
      status: 'success',
      result,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    })
    res.status(200).json({
      status: 'success',
      chat,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    })
    res.status(200).json({
      status: 'success',
      chat,
    })
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    })
  }
}


