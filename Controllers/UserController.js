const express = require('express');
const router = express.Router();
const userModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (user) => {
    return jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
};
//create new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        } else {
            const newUser = await userModel.create(req.body);
            res.status(201).json(newUser);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials Email' });
        }
        const isMatch = await bcrypt.compare(user.password, password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials Password' });
            console.log(isMatch);
        }
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(userModel),
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// user logout
router.get('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});
//reset password
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!newPassword || !newPassword.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
        return res.status(400).json({ message: 'Password must contain both letters and numbers' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 5);
    updateUserPasswordByEmail(email, hashedPassword, (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ message: 'An error occurred while updating the password.' });
        }

        // Check if the password was successfully updated
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Password changed successfully.' });
        } else {
            res.status(404).json({ message: 'User not found or password not updated.' });
        }
    });
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