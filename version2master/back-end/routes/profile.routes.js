;
'use strict'

const express = require('express');
let api = express.Router();

const ProfileController = require('../controllers/profile.controller'),
      authenticate = require('../middlewares/authenticate');

api.get('/getProfile', authenticate.tokenAuth, ProfileController.getprofile)
api.post('/postProfile', authenticate.tokenAuth, ProfileController.postprofile)
api.put('/putProfile/:id', authenticate.tokenAuth, ProfileController.putprofile)
api.delete('/deleteProfile/:id', ProfileController.deleteprofile)

module.exports = api