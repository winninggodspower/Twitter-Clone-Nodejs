const mongoose =  require('mongoose');
const { Schema } = mongoose;
const User = require("./user")

const postSchema = new Schema({
    content: {
        type: String,
        required: true
      },
    like: {
        type: Number,
        default: 0,
      },
    user: {
      type: Schema.Types.ObjectId,
      ref: User
      }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;