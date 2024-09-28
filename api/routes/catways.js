var express = require('express');
var router = express.Router();

const catwaysService = require('../services/catways');


router.get('/', catwaysService.listCatways);

router.get('/:id', catwaysService.getCatwayById);

router.post('/', catwaysService.createCatway);

router.put('/:id', catwaysService.updateCatway);

router.delete('/:id', catwaysService.deleteCatway);

module.exports = router
