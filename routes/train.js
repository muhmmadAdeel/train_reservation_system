
const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

router.post('/add', async (req, res) => {
    const { trainName, sourceStation, destination, departureTime } = req.body;

    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('trainName', sql.VarChar(100), trainName)
            .input('sourceStation', sql.VarChar(100), sourceStation)
            .input('destination', sql.VarChar(100), destination)
            .input('departureTime', sql.NVarChar(100), departureTime) 
            .query(`
                INSERT INTO train (name, source_station, destination_station, arrival_time)
                VALUES (@trainName, @sourceStation, @destination, @departureTime)
            `);

        res.send('Train added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding train');
    }
});


router.get('/all', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM train');
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching trains');
    }
});

module.exports = router;