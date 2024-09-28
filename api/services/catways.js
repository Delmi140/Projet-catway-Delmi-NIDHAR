const catwaysModel = require('../models/catway')

class CatwaysService {

    async listCatways(req, res) {
        try{
            const catways = await catwaysModel.listCatways()
            res.status(200).send(catways)
        }
        catch(error) {
            res.status(500).send({ message: error.message })
        }

    }

    async getCatwayById(req, res) {
        try {
            const catway = await catwaysModel.getCatwayById(req.params.id)
            res.status(200).send(catway)
        }
        catch(error) {
            res.status(500).send({ message: error.message })
        }


    }

    async createCatway(req, res){
        try{
            const newCatway = { ...req.body }
            const catwayId = await catwaysModel.addCatway(newCatway)
            res.render("dashboard", catwayId)
        }
        catch(error) {
            res.status(500).send({ message: error.message })
        }

    }

    async updateCatway(req, res) {
        try {
            const newCatway = { ...req.body, _id: req.params.id }
            await catwaysModel.updateCatway(newCatway)
            res.status(204).send()
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