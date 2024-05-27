const express = require('express');
const router = express.Router();
const WeatherData = require("../models/WeatherDataModel");

//crate new WeatherData
router.post('/', async (req, res) => {
    try {
        const NewWeatherData = await WeatherData.create(req.body);
        res.status(201).json(NewWeatherData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// get all Weather
router.get('/', async (req, res) => {
    try {
        const AllWeatherData = await WeatherData.findAll();
        if (AllWeatherData) {
            res.status(201).json(AllWeatherData);
        } else {
            res.status(400).json({ error: "empty table" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//get single Weather
router.get('/:id', async (req, res) => {
    try {
        const singleWeather = await WeatherData.findByPk(req.params.id);
        if (singleWeather) {
            res.status(201).json(singleWeather);
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// update Weather
router.put('/:id', async (req, res) => {
    try {
        const updated = await WeatherData.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedWeatherData = await WeatherData.findByPk(req.params.id);
            if (updatedWeatherData) {
                res.status(201).json(updatedWeatherData);
            } else {
                res.status(404).json({ error: 'Weather not found' });
            }
        } else {
            res.status(404).json({ error: 'not updated' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//delete Weather
router.delete("/:id", async (req, res) => {
    try {
        const deleteWeather = await WeatherData.destroy({ where: { id: req.params.id } });
        if (deleteWeather) {
            res.status(200).send("deleted");
        } else {
            res.status(400).json({ error: "not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;