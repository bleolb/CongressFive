;
'use strict'

const express = require('express')
let api = express.Router()

const ProfileController = require('../controllers/profile.controller'),
autentica = require('../middleware/authenticate/autentica')

api.get('/getProfile', autentica.autenticate, ProfileController.getprofile)
api.post('/postProfile', autentica.autenticate, ProfileController.postprofile)
api.put('/putProfile/:id', autentica.autenticate, ProfileController.putprofile)
api.delete('/deleteProfile/:id', ProfileController.deleteprofile)

module.exports = api