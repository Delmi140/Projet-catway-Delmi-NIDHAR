var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const usersService = require('../services/users');

router.get('/', usersService.listUsers )

router.get('/:id', usersService.getUserById);

router.post('/', usersService.createUser);

router.put('/:id', usersService.updateUser);

router.delete('/:id', usersService.deleteUser);

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usersService.authenticate(email, password); // Appelle la méthode de service
  
      if (user) {
        // Si l'utilisateur est authentifié, stocker le token dans une session ou cookie
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.cookie('authToken', token, { httpOnly: true });
        return res.redirect('/dashboard');
      } else {
        return res.status(401).render('connexion', { error: 'Email ou mot de passe incorrect.' });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return res.status(500).render('connexion', { error: 'Une erreur est survenue, veuillez réessayer.' });
    }
  });


module.exports = router;
