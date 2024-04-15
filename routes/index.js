var express = require("express");
var router = express.Router();
const passport = require("passport");
const userModel = require("./users");
const Reservation = require('./reservationServer');

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("login",{error: req.flash('error')});
});


router.get("/profile", isLoggedIn, function (req, res, next) {
  res.render("profile", { success: req.flash('success'), error: req.flash('error'), }); 
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
    res.redirect("/");
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
    res.redirect("/profile");
  } catch (error) {
    console.error("Error occurred during reservation:", error);
    req.flash('error', "An error Occurred.")
    res.redirect('/profile');
  }
});



module.exports = router;
