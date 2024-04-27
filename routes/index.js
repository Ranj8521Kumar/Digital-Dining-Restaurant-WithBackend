var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("./users");
const Reservation = require('../models/reservationServer');
const Contact = require('../models/contactServer');
const Subscribe = require('../models/subscribeServer'); // Import the Subscribe model
const upload = require("./multer");



const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login",{error: req.flash('error')});
});


router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render("profile", { success: req.flash('success'), error: req.flash('error'), user, successSubscribe: req.flash('successSubscribe'), errorSubscribe: req.flash('errorSubscribe'), }); 
});

router.post("/fileupload",isLoggedIn, upload.single("image"), async function (req, res, next) {
    const user = await userModel.findOne({username: req.session.passport.user});
    user.profileimage = req.file.filename;
    await user.save();
    res.redirect("/profile");
});

router.post("/register", (req, res)=>{
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});


router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash:true,//for using connect flash
  }),
  function (req, res) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


router.post('/reservation', async (req, res) => {
  try {
    const { name, phone, person, reservationDate, reservationTime, message } = req.body;
    const newReservation = new Reservation({
      name,
      phone,
      person,
      reservationDate,
      reservationTime,
      message
    });
    await newReservation.save();
    req.flash('success', "Reservation successful!");
    res.redirect("/profile#reservation");
  } catch (error) {
    console.error("Error occurred during reservation:", error);
    req.flash('error', "An error Occurred.")
    res.redirect('/profile#reservation');
  }
});


router.get('/contact', isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('contact',{ success: req.flash('success'), error: req.flash('error'), user});
})


router.post('/contact', async (req, res) => {
  try {
    // Extract data from request body
    const { name, email, message } = req.body;

    // Create a new contact instance
    const newContact = new Contact({
      name,
      email,
      message
    });

    // Save the contact to the database
    await newContact.save();

    // Respond with success message
    req.flash('success', "Contact Saved successful!");
    res.redirect("/contact");
  } catch (error) {
    console.error("Error occurred during Saving Contact:", error);
    req.flash('error', "An error Occurred.")
    res.redirect('/contact');
  }
});


router.get('/menu', isLoggedIn,  function(req,res,next){
  res.render('menu');
});


// POST route for subscribing
router.post('/subscribe', async (req, res) => {
  try {
    // Extract the email address from the request body
    const { email_address } = req.body;

    // Check if the email address is provided
    if (!email_address) {
      return res.status(400).json({ error: 'Email address is required' });
    }

    // Create a new document using the Subscribe model
    const newSubscriber = new Subscribe({ email_address });

    // Save the new subscriber to the database
    await newSubscriber.save();

    req.flash('successSubscribe', "You have Subscribed!");
    res.redirect("/profile#subscribe");
  } catch (error) {
    console.error("Error occurred during reservation:", error);
    req.flash('errorSubscribe', "An error Occurred.")
    res.redirect('/profile#subscribe');
  }
});

router.get('/profile/menu',async (req,res)=>{
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('menu',{user});
});


router.get('/profile/userprofile', isLoggedIn, async function(req,res,next){
  const user = await userModel.findOne({
    username: req.session.passport.user,
  });
  res.render('userprofile',{ success: req.flash('success'), error: req.flash('error'), user});
})


module.exports = router;
