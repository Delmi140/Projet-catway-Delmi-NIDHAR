const reservationModel = require('../models/reservation')

class ReservationService {

    async listReservations(req, res) {
        try {
            const reservations = await reservationModel.listReservations()
            console.log("Reservations récupérés :", reservations); // Ajoutez ce log
            return reservations;
        }
        catch (error) {
            console.error("Erreur lors de la récupération des Reservations :", error);
            throw new Error("Impossible de récupérer les Reservationss");

        }

    }

    async getReservationById(req, res) {
        try {
            const reservation = await reservationModel.getReservationById(req.params.id)
            res.status(200).send(reservation)
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

    async createReservation(req, res) {
        try {
            const newReservation = { ...req.body }
            const reservationId = await reservationModel.addReservation(newReservation)
            const reservations = await reservationModel.listReservations();
            res.render("dashboard", { reservations })
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

    async updateReservation(req, res) {
        try {
            const newReservation = { ...req.body, _id: req.params.id }
            await reservationModel.updateReservation(newReservation)
            res.status(204).send()

        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }

    async deleteReservation(req, res) {
        try {
            await reservationModel.deleteReservation(req.params.id)
            res.status(204).send()
        }
        catch (error) {
            res.status(500).send({ message: error.message })
        }

    }
    
}

module.exports = new ReservationService()