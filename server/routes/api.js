// api route

// reference express
const express = require('express');
const router = express.Router();
router.use(express.json());

// import schema
const DigimonCollection = require('../models/DigimonSchema');

// POST: using the digimon json, upload the data to the database
router.post('/',(req,res) => {
    const digimonData = require('./digimon-json');
    // res.send(digimonData);
    DigimonCollection.create(digimonData, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    });
});

// GET: read a digimon by name
router.get('/searchByName/:name', (req,res) => {
    // res.send('read by name');
    DigimonCollection.findOne({name: req.params.name},(errors,results) => {
        errors ? res.send(errors):res.send(results);
    })
});

// GET: read digimon by generation
router.get('/searchByGeneration/:generation', (req,res) => {
    // res.send('read by generation');
    DigimonCollection.find({generation: req.params.generation}, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    })
});

// GET: read digimon by attribute
router.get('/searchByAttribute/:attribute', (req,res) => {
    // res.send('read by attribute');
    DigimonCollection.find({attribute: req.params.attribute}, (errors,results) => {
        errors ? res.send(errors):res.send(results);
    })
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// export
module.exports = router;