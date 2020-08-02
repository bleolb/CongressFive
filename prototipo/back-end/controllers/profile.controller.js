;
'use strict'
const Profile = require('../models/profile')
const fs = require('fs')
const path = require('path')


let getprofile = async (req, res) => {
    let profile = await Profile.find()
    if (profile) {
        console.log(profile)
        res.status(200).json({
            ok: true,
            profile
        })
    } else if (profile.length === 0) {
        res.send('No hay ningún perfil')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postprofile = async (req, res) => {
  
    let profile = req.body.profile
    let newprofile = new Profile(profile)
    await newprofile.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newprofile,
                sms: 'Perfil creado'
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: e
            })
        })
}

let putprofile = async (req, res) => {
    let id = req.params.id
    let profile = req.body.profile;
    let putprofile = await Profile.updateOne({_id: id}, {$set: profile})
    if (putprofile) {
        res.status(200).json({
            ok: true,
            profile,
            sms: 'Perfil actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}
let deleteprofile = async (req, res) =>{
    let id = req.params.id
    let deleteprofile = await Profile.deleteOne({ '_id': id })
        if(deleteprofile){
            res.status(200).json({
                ok: true,
                id,
                sms: 'Perfil borrado'
            })
        } else {
            res.status(500).json({
                ok: false,
                data: null
            })
        }

}

module.exports = {
    getprofile,
    postprofile,
    putprofile,
    deleteprofile
}