var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");


// Define schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  // You can add more fields as needed
});

// Create model
contactSchema.plugin(plm);
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
