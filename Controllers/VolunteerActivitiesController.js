const express = require('express');
const router = express.Router();
const VolunteerActivities = require("../models/VolunteerActivitiesModel");

// create new VolunteerActivity
router.post('/', async (req, res) => {
    try {
        const NewVolunteerActivity = await VolunteerActivities.create(req.body);
        res.status(201).json(NewVolunteerActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all VolunteerActivities
router.get('/', async (req, res) => {
    try {
        const AllVolunteerActivities = await VolunteerActivities.findAll();
        if (AllVolunteerActivities) {
            res.status(201).json(AllVolunteerActivities);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single VolunteerActivity
router.get('/:id', async (req, res) => {
    try {
        const singleVolunteerActivity = await VolunteerActivities.findByPk(req.params.id);
        if (singleVolunteerActivity) {
            res.status(201).json(singleVolunteerActivity);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update VolunteerActivity
router.put('/:id', async (req, res) => {
    try {
        const updated = await VolunteerActivities.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedVolunteerActivity = await VolunteerActivities.findByPk(req.params.id);
            if (updatedVolunteerActivity) {
                res.status(201).json(updatedVolunteerActivity);
            } else {
                res.status(404).json({ error: 'VolunteerActivities not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete VolunteerActivity
router.delete("/:id", async (req, res) => {
    try {
        const deleteVolunteerActivity = await VolunteerActivities.destroy({ where: { id: req.params.id } });
        if (deleteVolunteerActivity) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;