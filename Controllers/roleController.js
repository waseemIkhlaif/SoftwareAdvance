const express = require('express');
const router = express.Router();
const role = require("../models/roleModel");

// create new role
router.post('/', async (req, res) => {
    try {
        const Newrole = await role.create(req.body);
        res.status(201).json(Newrole);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all role
router.get('/', async (req, res) => {
    try {
        const roles = await role.findAll();
        if (roles) {
            res.status(201).json(roles);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single role
router.get('/:id', async (req, res) => {
    try {
        const singlerole = await role.findByPk(req.params.id);
        if (singlerole) {
            res.status(201).json(singlerole);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update role
router.put('/:id', async (req, res) => {
    try {
        const updated = await role.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedrole = await role.findByPk(req.params.id);
            if (updatedrole) {
                res.status(201).json(updatedrole);
            } else {
                res.status(404).json({ error: 'role not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete role
router.delete("/:id", async (req, res) => {
    try {
        const deleterole = await role.destroy({ where: { id: req.params.id } });
        if (deleterole) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;