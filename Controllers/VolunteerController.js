const express = require('express');
const router = express.Router();
const Volunteer = require('../models/VolunteerModel');

//crate new Volunteer
router.post('/', async (req, res) => {
    try {
        const NewVolunteer = await Volunteer.create(req.body);
        res.status(201).json(NewVolunteer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all Volunteer
router.get('/', async (req, res) => {
    try {
        const AllVolunteers = await Volunteer.findAll();
        if (AllVolunteers) {
            res.status(201).json(AllVolunteers);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single Volunteer
router.get('/:id', async (req, res) => {
    try {
        const singleVolunteer = await Volunteer.findByPk(req.params.id);
        if (singleVolunteer) {
            res.status(201).json(singleVolunteer);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update Volunteer
router.put('/:id', async (req, res) => {
    try {
        const updated = await Volunteer.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedVolunteer = await Volunteer.findByPk(req.params.id);
            if (updatedVolunteer) {
                res.status(201).json(updatedVolunteer);
            } else {
                res.status(404).json({ error: 'Volunteer not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete Volunteer
router.delete("/:id", async (req, res) => {
    try {
        const deleteVolunteer = await Volunteer.destroy({ where: { id: req.params.id } });
        if (deleteVolunteer) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;