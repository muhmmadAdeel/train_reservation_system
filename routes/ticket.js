

const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');


router.post('/book', async (req, res) => {
    const { passenger_id, train_id, travel_date, seat_no } = req.body;
    const booking_date = new Date(); 

    try {
        let pool = await sql.connect(config);

        await pool.request()
            .input('passenger_id', sql.Int, passenger_id)
            .input('train_id', sql.Int, train_id)
            .input('booking_date', sql.DateTime, booking_date)
            .input('travel_date', sql.DateTime, new Date(travel_date)) 
            .input('seat_no', sql.NVarChar(50), seat_no)
            .query(`
                INSERT INTO ticket (passenger_id, train_id, booking_date, travel_date, seat_no)
                VALUES (@passenger_id, @train_id, @booking_date, @travel_date, @seat_no)
            `);

        res.send('Ticket booked successfully');
    } catch (err) {
        console.error('Booking error:', err);
        res.status(500).send('Error booking ticket');
    }
});


router.get('/myTicket/:id', async (req, res) => {  
    const { id } = req.params; 

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('passenger_id', sql.Int, id)
            .query(`SELECT * FROM ticket WHERE passenger_id = @passenger_id`);

        res.json(result.recordset); 
    } catch (err) {
        console.error('Fetching error:', err);
        res.status(500).send('Error fetching tickets');
    }
});





module.exports = router;
