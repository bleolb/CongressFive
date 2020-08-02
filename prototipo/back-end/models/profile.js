;
'use strict'
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Profile = new Schema({
    level_academy: {
        type: String,
        enum: ['Master', 'TercerNivel', 'SegundoNivel']
        
    },
    specialty: {
        type: String,
        enum: ['Medicina', 'Economía', 'Deportes', 'Educacion']
    },
    
});
module.exports = mongoose.model('profile', Profile);