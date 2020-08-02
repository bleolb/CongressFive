;
'use strict'
const Person = require('../models/Person')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let getPersonById = async (req, res) => {
    let id = req.params.id
    let person = await Person.findById({_id: id})
    if (person) {
        res.status(200).json({
            ok: true,
            data: person,
            sms : "Su Usuario es: "
        })
    } else if (person.length === 0) {
        res.send('El usaurio no está registrado en el sistema')
    } else {
        res.status(500).json({
            ok: false,
            data: null,
            sms : "usuarios no encontrados"
        })
    }
}

let getPersons = async (req, res) => {
    let persons = await Person.find()
    if (persons) {
        res.status(200).json({
            ok: true,
            data: persons,
            sms : "Usuarios existentes"
        })
    } else if (persons.length === 0) {
        res.send('No hay ningún usuario registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null,
            sms : "Usuarios no encontrados"
        })
    }
}

let postPerson = async (req, res) => {
    let person = req.body.person
    let newPerson = new Person(person)
    await newPerson.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                data: newPerson,
                sms: 'Usuario creado'
            })
        }).catch(e => {
            res.status(500).json({
                ok: false,
                data: null,
                sms: e
            })
        })
}

let putPerson = async (req, res) => {
    let id = req.params.id
    let person = req.body.person;
    let putPerson = await Person.updateOne({_id: id}, {$set: person})
    if (putPerson) {
        res.status(200).json({
            ok: true,
            data: person,
            sms: 'Usuario actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null,
            sms: e
        })
    }
}

let disablePerson = async (req, res) => {
    let id = req.params.id
    let person = req.body
    console.log(person)
    let disablePerson = await Person.updateOne({_id: id}, {$set: {status: person.status}})
    if (disablePerson) {
        res.status(200).json({
            ok: true,
            sms: 'Usuario actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null,
            sms: e
        })
    }
}

let login = async (req, res) => {
    let person = req.body.person
    let personLog = await Person.find({email: person.email})
    if (personLog.length > 0) {
        tokenBody = {
            name: personLog[0].name,
            email: personLog[0].email,
            rol: personLog[0].rol,
        };
        if (bcrypt.compareSync(person.password, personLog[0].password)) {
            let token = jwt.sign(tokenBody, process.env.KEY_JWT, {
                algorithm: 'HS256',
                expiresIn: parseInt(process.env.TIME)
            })
            res.status(200).json({
                ok: true,
                sms: 'Usuario y Contrtaseña válidos',
                token
            })
        } else {
            res.status(200).send('Contraseña o correo incorrectos')
        }
    } else {
        res.status(200).send('La cuenta no existe')
    }
}

module.exports = {
    getPersonById,
    getPersons,
    postPerson,
    putPerson,
    disablePerson,
    login
}
