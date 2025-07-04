

const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { sql, config } = require('./db');

router.post('/register', async (req, res) => {
    const { name, designation, shift_timing, contact, username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let pool = await sql.connect(config);
        await pool.request()
            .input('name', sql.VarChar(100), name)
            .input('designation', sql.VarChar(50), designation)
            .input('shift_timing', sql.VarChar(50), shift_timing)
            .input('contact', sql.VarChar(20), contact)
            .input('username', sql.NVarChar(50), username)
            .input('password', sql.NVarChar(100), hashedPassword)
            .query(`
                INSERT INTO staff (name, designation, shift_timing, contact, username, password)
                VALUES (@name, @designation, @shift_timing, @contact, @username, @password)
            `);

        res.send('Staff registered successfully');
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send('Error registering staff');
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('username', sql.VarChar(50), username)
        .input('password', sql.NVarChar(100), password)
        .query(`SELECT * FROM staff WHERE username = @username and password = @password`);
        
       if   (result.recordset.length === 0) {
        return res.status(401).send('Invalid credentials');
    }   else {
        res.send('Login successful');
    }
    
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Login error');
    }
});

module.exports = router;
