var express = require('express');
var router = express.Router();

const usersService = require('../services/users');

router.get('/', usersService.listUsers )

router.get('/:id', usersService.getUserById);

router.post('/', usersService.createUser);

router.put('/:id', usersService.updateUser);

router.delete('/:id', usersService.deleteUser);


module.exports = router;
