var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

const reservationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    person: String,
    reservationDate: Date,
    reservationTime:String,
    message: String
});

reservationSchema.plugin(plm);
const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports=Reservation;