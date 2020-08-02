;
'use strict'
const Links = require('../models/Links')
const fs = require('fs')
const path = require('path')


let getLinks = async (req, res) => {
    let links = await Links.find()
    if (links) {
        console.log(links)
        res.status(200).json({
            ok: true,
            links
        })
    } else if (links.length === 0) {
        res.send('No hay ningún link registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postLinks = async (req, res) => {
  
    let links = req.body.links
    let newLinks = new Links(links)
    await newLinks.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newLinks,
                sms: 'Link creado'
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: e
            })
        })
}

let putLinks = async (req, res) => {
    let id = req.params.id
    let links = req.body.links;
    let putLinks = await Links.updateOne({_id: id}, {$set: links})
    if (putLinks) {
        res.status(200).json({
            ok: true,
            links,
            sms: 'Link actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}
let deleteLinks = async (req, res) =>{
    let id = req.params.id
    let deleteLinks = await Links.deleteOne({ '_id': id })
        if(deleteLinks){
            res.status(200).json({
                ok: true,
                id,
                sms: 'Link borrado'
            })
        } else {
            res.status(500).json({
                ok: false,
                data: null
            })
        }

}

module.exports = {
    getLinks,
    postLinks,
    putLinks,
    deleteLinks
}