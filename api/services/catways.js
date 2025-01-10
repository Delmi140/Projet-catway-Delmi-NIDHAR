const catwaysModel = require('../models/catway')

class CatwaysService {

    async listCatways(req, res) {
        try{
            const catways = await catwaysModel.listCatways();
            console.log("Catways récupérés :", catways); // Ajoutez ce log
            return catways;
        }
        catch(error) {
            console.error("Erreur lors de la récupération des catways :", error);
            throw new Error("Impossible de récupérer les catways");
        }

    }

    async getCatwayById(id) {
        try {
            return await catwaysModel.getCatwayById(id)
            
        }
        catch(error) {
            console.error("Erreur:", error);
            throw error;

        }


    }

    async createCatway(req, res){
        try{
            const newCatway = { ...req.body }
            const catwayId = await catwaysModel.addCatway(newCatway)
            const catways = await catwaysModel.listCatways();
            res.render("dashboard", { catways })
        }
        catch(error) {
            res.status(500).send({ message: error.message })
        }

    }

    async updateCatway(req, res) {
        try {
            const newCatway = { ...req.body, _id: req.params.id }
            await catwaysModel.updateCatway(newCatway)
            res.redirect('/dashboard');
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

    async deleteCatway(req, res) {
        try {
            await catwaysModel.deleteCatway(req.params.id)
            res.status(204).send()
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

}

module.exports = new CatwaysService()