var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationRouter = require('../routes/reservations');
const reservationsService = require('../services/reservations');
const catwaysService = require('../services/catways');



router.get("/dashboard", (req, res) => {
  res.render("dashboard");
}); 


router.get("/catways",catwaysService.listCatways, (req, res) => {
  res.render("catways");
});  

router.get("/reservations",reservationsService.listReservations, (req, res) => {
  res.render("reservations");
});  

router.get("/catway", (req, res) => {
  res.render("catway");
});  

router.get("/reservation", (req, res) => {
  res.render("reservation");
});  

router.get("/", (req, res) => {
  res.render("connexion");
});



router.use('/users', userRoute);
router.use('/catways', catwaysRouter);
router.use('/reservations', reservationRouter)

module.exports = router;
