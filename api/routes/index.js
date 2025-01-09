var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const catwaysRouter = require('../routes/catways');
const reservationRouter = require('../routes/reservations');
const reservationsService = require('../services/reservations');
const catwaysService = require('../services/catways');
const usersService = require('../services/users')


router.get("/dashboard", async (req, res) => {
  try {
    const users = await usersService.listUsers();
    const reservations = await reservationsService.listReservations();
    const catways = await catwaysService.listCatways();
    res.render("dashboard", { users, reservations,catways });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});




router.get("/catways", async (req, res) => {
  try {
    
    const catways = await catwaysService.listCatways();
    res.render("catways", { catways });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});





router.get("/reservations", async (req, res) => {
  try {
    
    const reservations = await reservationsService.listReservations();
    res.render("reservations", { reservations });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
