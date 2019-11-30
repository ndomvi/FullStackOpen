const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (_, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
