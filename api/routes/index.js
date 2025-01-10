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
    console.log({ users, reservations, catways });
    res.render("dashboard", { users, reservations,catways });
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw new Error("Impossible de récupérer les catways");
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









router.get("/", (req, res) => {
  res.render("connexion");
});


router.delete('/:id', async (req, res) => {
  try {
      await reservationsService.deleteReservation(req.params.id);
      await catwaysService.deleteCatway(req, res); 
      await usersService.deleteUser(req.params.id); // Appelle le service pour supprimer l'utilisateur
      res.redirect('/dashboard'); // Redirige vers le tableau de bord après suppression
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
});


router.get('/users/edit/:id', async (req, res) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.render('editUser', { user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get('/catways/edit/:id', async (req, res) => {
  try {
    const catway = await catwaysService.getCatwayById(req.params.id);
    res.render('editCatway', { catway });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



router.use('/users', userRoute);
router.use('/catways', catwaysRouter);
router.use('/reservations', reservationRouter)

module.exports = router;
