
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UsersService {

	async listUsers(req, res) {
		try {
			const users = await userModel.listUsers()
			console.log("Users récupérés :", users); // Ajoutez ce log
			return users;
		}
		catch (error){
			console.error("Erreur lors de la récupération des users :", error);
            throw new Error("Impossible de récupérer les users");

		}


	}

	async getUserById (id) {
		try {
			return await userModel.getUserById(id)
		}
		catch (error) {
			console.error("Erreur:", error);
        	throw error;
		}

	}

	async createUser (req, res) {
		try {
			const newUser = { ...req.body }
			const userId = await userModel.addUser(newUser)
			const users = await userModel.listUsers();
			res.render("dashboard", { users });

		}
		catch (error) {
			res.status(500).send({ message: error.message })
			
			
		}

	}

	async updateUser (req, res) {
		try {
			const newUser = { ...req.body, _id: req.params.id }
			await userModel.updateUser(newUser)
			res.redirect('/dashboard');
		}
		catch (error) {
			res.status(500).send({ message: error.message })
		}

	}

	async deleteUser (req, res) {
		try {
			await userModel.deleteUser(req.params.id)
			res.status(204).send()
		}
		catch (error) {
			res.status(500).send({ message: error.message })
		}

	}

	
	async authenticate(email, password) {
		try {
		  const user = await userModel.findOne({ email: email });
		  if (!user) throw new Error('Utilisateur non trouvé');
	  
		  const isMatch = await bcrypt.compare(password, user.password);
		  if (!isMatch) throw new Error('Mot de passe incorrect');
	  
		  return user;
		} catch (error) {
		  console.error('Erreur d\'authentification :', error);
		  throw error;
		}
	  }
	  
	
	



}

module.exports = new UsersService()


	