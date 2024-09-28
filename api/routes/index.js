var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationRouter = require('../routes/reservations');




router.get("/", (req, res) => {
  res.render("dashboard");
}); 


router.get("/catways", (req, res) => {
  res.render("catways");
});  

router.get("/reservations", (req, res) => {
  res.render("reservations");
});  

router.get("/catway", (req, res) => {
  res.render("catway");
});  

router.get("/reservation", (req, res) => {
  res.render("reservation");
});  

router.get("/connexion", (req, res) => {
  res.render("connexion");
});



router.use('/users', userRoute);
router.use('/catways', catwaysRouter);
router.use('/reservations', reservationRouter)

module.exports = router;
