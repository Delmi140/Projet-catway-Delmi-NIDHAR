const mongoose = require('mongoose'); 
const Schema = mongoose. Schema;
const catway = require('../models/catway')

class ReservationsModel {

    reservation = new Schema ({

        catwayNumber: {
            type : Number, 
            trim : true ,
            children:[catway]
        },
        clientName: {
            type: String,
            trim : true
         },
        boatName:{
            type : String,
            trim :  true
           
        },
        checkIn:{
            type: Date, 
            default: Date.now()
        },
        checkOut:{
            type: Date, 
            default: Date.now()
        }    
    },{
        timestamps: true 
    });
    

    Reservation = mongoose.model('Reservation', this.reservation)


    async listReservations() {
        try {
            const reservations = await this.Reservation.find().exec()
            return reservations
        }
        catch (error) {
            throw error
        }

    }

    async getReservationById(reservationId) {
        try {
            const reservation = await this.Reservation.findById(reservationId).exec()
            return reservation
        }
        catch (error) {
            throw error
        }

    }

    async addReservation(newReservation) {
        try {
            const newReservationMongoose = new this.Reservation(newReservation)
            const reservationRegistered = await newReservationMongoose.save()
            return reservationRegistered._id
        }
        catch (error) {
            throw error
        }

    }

    async updateReservation(reservation) {
        try {
            await this.Reservation.findByIdAndUpdate(reservation._id, reservation)
        }
        catch (error) {
            throw error
        }

    }

    async deleteReservation(reservationId) {
        try {
            await this.Reservation.findByIdAndDelete(reservationId)
        }
        catch (error) {
            throw error
        }
    }


}

module.exports = new ReservationsModel()
