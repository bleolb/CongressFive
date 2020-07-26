;
'use strict'

const express = require('express')
let api = express.Router()

const personController = require('../controllers/person.controller'),
    autentica = require('../middleware/authenticate/autentica'),
    passwordControl = require('../middleware/authenticate/password');

api.get('/getPersonById/:id', autentica.autenticate, personController.getPersonById)
api.get('/getPersons', autentica.autenticate, personController.getPersons)
api.post('/postPerson', passwordControl.encode, personController.postPerson)
api.put('/putPerson/:id', autentica.autenticate, personController.putPerson)
api.delete('/deletePerson/:id', autentica.autenticate, personController.deletePerson)
api.post('/login', personController.login)

module.exports = api
