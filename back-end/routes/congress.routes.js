;
'use strict'


const express = require('express')
let api = express.Router()

const congressController = require('../controllers/congress.controller'),
    autentica = require('../middleware/authenticate/autentica');


api.get('/getCongress', autentica.autenticate, congressController.getCongress)
api.post('/postCongress', autentica.autenticate, congressController.postCongress)
api.put('/putCongress/:id', autentica.autenticate, congressController.putCongress)

module.exports = api
