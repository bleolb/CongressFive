;
'use strict'

const express = require('express');
let api = express.Router();

const LinksController = require('../controllers/links.controller'),
      authenticate = require('../middlewares/authenticate');

api.get('/getLinks', authenticate.tokenAuth, LinksController.getLinks)
api.post('/postLinks', authenticate.tokenAuth, LinksController.postLinks)
api.put('/putLinks/:id', authenticate.tokenAuth, LinksController.putLinks)
api.delete('/deleteLinks/:id', LinksController.deleteLinks)

module.exports = api