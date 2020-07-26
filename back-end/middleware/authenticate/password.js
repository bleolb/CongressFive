;
'use strict'

const bcrypt = require('bcrypt')


let encode = (req, res, next) => {
    let person = req.body.person || null
    if (!person || !person.password) {
        return res.status(401).send('usuario o contraseña invalidos')
    } else {
        let encodepassword = bcrypt.hashSync(person.password, bcrypt.genSaltSync(10))
        if (encodepassword) {
            req.body.person.password = encodepassword
            req.body.person.createAt = new Date()
            req.body.person.sessionID = req.sessionID
            console.log(req.body.person.sessionID);
            next();
        } else {
            return res.status(401).send('contraseña no encriptada')
        }
    }
}

module.exports = { encode }