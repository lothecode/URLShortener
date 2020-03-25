const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  input: {
    type: String,
    required: true
  },
  random_code: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Record', recordSchema)