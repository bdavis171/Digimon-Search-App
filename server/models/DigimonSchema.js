// digimon schema

// reference mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define DigimonSchema
const DigimonSchema = new Schema(
    {
        name: String,
        generation: String,
        attribute: String,
        priorForm: String,
        nextForm: String,
        description: String,
        img: String
    },
    {timestamps: true}
);

// export
module.exports = mongoose.model('digimon',DigimonSchema);