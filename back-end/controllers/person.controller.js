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
            person
        })
    } else if (person.length === 0) {
        res.send('El usaurio no está registrado en el sistema')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let getPersons = async (req, res) => {
    let persons = await Person.find()
    if (persons) {
        res.status(200).json({
            ok: true,
            persons
        })
    } else if (persons.length === 0) {
        res.send('No hay ningún usuario registrado')
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let postPerson = async (req, res) => {
    let person = req.body.person
    let newPerson = new Person(person)
    console.log(newPerson)
    await newPerson.save()
        .then(() => {
            res.status(200).json({
                ok: true,
                newPerson,
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
            person,
            sms: 'Usuario actualizado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let deletePerson = async (req, res) => {
    let id = req.params.id
    let deletePerson = await Person.deleteOne({'_id': id})
    console.log(deletePerson)
    if (deletePerson) {
        res.status(200).json({
            ok: true,
            sms: 'Usuario eliminado'
        })
    } else {
        res.status(500).json({
            ok: false,
            data: null
        })
    }
}

let login = async (req, res) => {
    let person = req.body.person
       let personLog = await Person.find({email: person.email})
    if (personLog.length > 0) {
       console.log(personLog[0].password)
       console.log(person.password)
            let token,
                tokenBody = {
                    names: personLog[0].names,
                    email: personLog[0].email,
                    sessionID: personLog[0].sessionID,
                };
            bcrypt.compareSync(person.password, personLog[0].password) ?
            
                ((token = jwt.sign({ personlog: tokenBody }, process.env.KEY_JWT, {
                        algorithm: "HS256",
                        expiresIn: 60000,
                    })),
                    res.status(200).json({
                        transaccion: true,
                        data: person,
                        msg: "User OK",
                        token,
                    })) :
                res.status(404).json({
                    transaccion: false,
                    data: null,
                    msg: "Incorrect password",
                    token: null,
               });
                    
      
    } else {
        res.status(200).send('La cuenta no existe')
    }
}

module.exports = {
    getPersonById,
    getPersons,
    postPerson,
    putPerson,
    deletePerson,
    login
}
