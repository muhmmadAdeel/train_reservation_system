const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // const { username, password } = req.body;

    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('username', sql.VarChar(50), username)
        .input('password', sql.NVarChar(100), password)
        .query(`SELECT * FROM passenger WHERE username = @username and password = @password`);
        
       if(result.recordset.length === 0) {
        return res.status(401).send('Invalid credentials');
    }   else {
        res.send('Login successful');
    }
    
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('Login error');
    }
    // try {
    //     const pool = await poolPromise;
    //     const result = await pool.request()
    //         .input('username', sql.VarChar, username)
    //         .input('password', sql.VarChar, password)
    //         .query(`
    //             SELECT Username ,Password
    //             FROM PassengerReg 
    //             WHERE Username = @username AND Password = @password
    //         `);

    //     if (result.recordset.length > 0) {
    //         // Login success
    //         const user = result.recordset[0];
    //         res.json({ success: true, message: 'Login successful', user });
    //     } else {
    //         // Invalid credentials
    //         res.status(401).json({ success: false, message: 'Invalid username or password' });
    //     }

    // } catch (err) {
    //     console.error('Login error:', err);
    //     res.status(500).json({ success: false, message: 'Server error' });
    // }
});

module.exports = router;
