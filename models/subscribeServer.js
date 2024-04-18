var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
// Define the schema for the "subscribe" collection
const subscribeSchema = new mongoose.Schema({
  email_address: {
    type: String,
    required: true,
    unique: true // Ensure email addresses are unique
  },
  subscribed_at: {
    type: Date,
    default: Date.now // Automatically set the current date when a document is created
  }
});

subscribeSchema.plugin(plm);
// Create the Mongoose model for the "subscribe" collection
const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe; // Export the Subscribe model for use in other files
