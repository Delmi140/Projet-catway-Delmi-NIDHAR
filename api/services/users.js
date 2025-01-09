
const userModel = require('../models/user');

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

	async getUserById (req, res) {
		try {
			const user = await userModel.getUserById(req.params.id)
			res.status(200).send(user)
		}
		catch (error) {
			res.status(500).send({ message: error.message })
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
			res.status(204).send()
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
}

module.exports = new UsersService()


	