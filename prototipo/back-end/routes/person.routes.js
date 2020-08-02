;
'use strict'

const express = require('express')
let api = express.Router()

const personController = require('../controllers/person.controller')
const authenticate = require('../middlewares/authenticate')
const encodings = require('../middlewares/encodings')

api.get('/getPersonById/:id', [authenticate.tokenAuth], personController.getPersonById)
api.get('/getPersons', [authenticate.tokenAuth], personController.getPersons)
api.post('/postPerson', [authenticate.emailAuth, encodings.encodePassword], personController.postPerson)
api.put('/putPerson/:id', [authenticate.tokenAuth, authenticate.emailAuth, encodings.encodePassword], personController.putPerson)
api.put('/disablePerson/:id', [authenticate.tokenAuth], personController.disablePerson)
api.post('/login', personController.login)

module.exports = api
