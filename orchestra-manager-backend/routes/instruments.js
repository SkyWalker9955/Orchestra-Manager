const router = require('express').Router();
let Instrument = require('../models/instruments.model');

router.route('/').get((req, res) => {
    Instrument.find()
        .then(instruments => res.json(instruments))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Instrument.findById(req.params.id)
        .then(instrument => res.json(instrument))
        .catch(err => res.status(400).json('Error' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const value = req.body.value;

    const newInstrument = new Instrument({
        name,
        value,
    });

    newInstrument.save()
        .then(() => res.json('Instrument saved!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/delete/:id').delete((req, res) => {
    Instrument.findByIdAndDelete(req.params.id)
        .then(() =>res.json('Instrument Deleted'))
        .catch(err => res.status(400).json("Error: " + err))
});

router.route('/edit/:id').put((req, res) => {
    Instrument.findbyID(req.params.id)
        .then(instrument => {
            if (instrument.name != req.body.name) 
                instrument.name = req.body.name;
            if (instrument.value != req.body.value)
                instrument.value = req.body.value;
        });
});


module.exports = router;