const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  questions: { type: String, required: true },
  answers: { type: String, required: true },
  checkData: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{
  versionKey:false
});

const postModel = mongoose.model('Post', postSchema);

module.exports = {postModel};