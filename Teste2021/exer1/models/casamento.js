const mongoose = require('mongoose')

var casamentoSchema = mongoose.Schema({
  _id: String,
  title: String,
  date: String,
  href: String,
  
})

module.exports = mongoose.model('casamento', casamentoSchema)