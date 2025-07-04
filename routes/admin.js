
const express = require('express');
const router = express.Router();
const { sql, config } = require('./db'); 


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM admin WHERE username = @username AND password = @password');

        if (result.recordset.length > 0) {
            
            res.json({ success: true, message: 'Login successful' });
        } else {
           
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, message: 'Login error, please try again later' });
    }
});

module.exports = router;
