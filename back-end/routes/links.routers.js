;
'use strict'

const express = require('express')
let api = express.Router()

const LinksController = require('../controllers/links.controller'),
autentica = require('../middleware/authenticate/autentica')

api.get('/getLinks', autentica.autenticate, LinksController.getLinks)
api.post('/postLinks', autentica.autenticate, LinksController.postLinks)
api.put('/putLinks/:id', autentica.autenticate, LinksController.putLinks)
api.delete('/deleteLinks/:id', LinksController.deleteLinks)

module.exports = api