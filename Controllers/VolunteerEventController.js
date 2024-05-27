const express = require('express');
const router = express.Router();
const VolunteerEvent = require("../models/VolunteerEventModel");

//crate new VolunteerEvent
router.post('/', async (req, res) => {
    try {
        const NewVolunteerEvent = await VolunteerEvent.create(req.body);
        res.status(201).json(NewVolunteerEvent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all VolunteerEvents
router.get('/', async (req, res) => {
    try {
        const AllVolunteerEvents = await VolunteerEvent.findAll();
        if (AllVolunteerEvents) {
            res.status(201).json(AllVolunteerEvents);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single VolunteerEvent
router.get('/:id', async (req, res) => {
    try {
        const singleVolunteerEvent = await VolunteerEvent.findByPk(req.params.id);
        if (singleVolunteerEvent) {
            res.status(201).json(singleVolunteerEvent);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update VolunteerEvent
router.put('/:id', async (req, res) => {
    try {
        const updated = await VolunteerEvent.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedVolunteerEvent = await VolunteerEvent.findByPk(req.params.id);
            if (updatedVolunteerEvent) {
                res.status(201).json(updatedVolunteerEvent);
            } else {
                res.status(404).json({ error: 'VolunteerEvent not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete VolunteerEvent
router.delete("/:id", async (req, res) => {
    try {
        const deleteVolunteerEvent = await VolunteerEvent.destroy({ where: { id: req.params.id } });
        if (deleteVolunteerEvent) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;