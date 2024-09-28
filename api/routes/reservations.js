var express = require('express');
var router = express.Router();

const reservationsService = require('../services/reservations');

router.get('/', reservationsService.listReservations);

router.get('/:id', reservationsService.getReservationById);

router.post('/', reservationsService.createReservation);

router.put('/:id', reservationsService.updateReservation);

router.delete('/:id', reservationsService.deleteReservation);

module.exports = router