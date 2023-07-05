const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
  comment:{
    type:String
  }
});

const Blog = mongoose.model('Post', blogSchema);

module.exports = Blog;
