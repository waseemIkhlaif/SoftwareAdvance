const express = require('express');
const router = express.Router();
const userModel = require("../models/UserModel");

//create new user
router.post('/', async (req, res) => {
    try {
        const NewUser = await userModel.create(req.body);
        res.status(201).json(NewUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all users
router.get('/', async (req, res) => {
    try {
        const users = await userModel.findAll();
        if (users) {
            res.status(201).json(users);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single user
router.get('/:id', async (req, res) => {
    try {
        const singleUser = await userModel.findByPk(req.params.id);
        if (singleUser) {
            res.status(201).json(singleUser);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// update user
router.put('/:id', async (req, res) => {
    try {
        const updated = await userModel.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updateduser = await userModel.findByPk(req.params.id);
            res.json(updateduser);
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete user
router.delete("/:id", async (req, res) => {
    try {
        const deleteUser = await userModel.destroy({ where: { id: req.params.id } });
        if (deleteUser) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;