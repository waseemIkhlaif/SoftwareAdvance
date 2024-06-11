const express = require('express');
const connection = require("../../../config/db.js");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const bcrypt = require('bcrypt');
const {, signupSchema } = require('../../services/validation/validation.js');

                            return res.status(400).json({ message: 'Unknown role' });
                    }
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ error: err.stack });
    }
};

const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { UserName, skills, interests, role, email, password, materials } = req.body;
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Request body is missing or empty' });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const sql = INSERT INTO users (email, UserName, password, skills, role, interests, materials) VALUES ('${email}', '${UserName}', '${hashedPassword}', '${role}');
        connection.execute(sql, (err, result) => {
            if (err) {
                if (err.errno == 1062) {
                    return res.status(409).json({ message: "Email already exists" });
                } else {
                    console.error(err);
                    return res.status(500).json({ error: "Internal server error" });
                }
            }
            return res.status(201).json({ message: "User created successfully" });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const sql = DELETE FROM tokens WHERE token = "${token}";
        connection.execute(sql, (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'An error occurred while logging out' });
            }
            console.log('Token removed from the database');
        });

        return res.status(200).json({
            "message": "Logout successful...See you soon!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err.stack);
    }
};

module.exports = { login, signup, logout };