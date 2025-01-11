
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.authToken; // Récupérer le token dans les cookies
  if (!token) {
    return res.redirect('/'); // Redirige si aucun token n'est présent
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Vérifier le token
    req.user = decoded; // Stocker les données utilisateur pour une utilisation ultérieure
    next(); // Passer au middleware suivant
  } catch (error) {
    console.error('Token invalide :', error);
    res.redirect('/'); // Rediriger en cas d'erreur
  }
}


module.exports = authMiddleware;
