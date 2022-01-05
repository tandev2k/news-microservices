const mongoose = require('mongoose')

const topicCommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    subComments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    position: {
      startKey: {
        type: String,
        required: true,
      },
      startTextIndex: {
        type: Number,
        required: true,
      },
      startOffset: {
        type: Number,
        required: true,
      },
      endKey: {
        type: String,
        required: true,
      },
      endTextIndex: {
        type: Number,
        required: true,
      },
      endOffset: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('TopicComment', topicCommentSchema)
