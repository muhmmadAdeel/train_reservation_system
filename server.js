
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const passengerRoutes = require('./routes/passenger');
const staffRoutes = require('./routes/staff');

const trainRoutes = require('./routes/train');
const ticketRoutes = require('./routes/ticket');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api/passenger', passengerRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/train', trainRoutes);
app.use('/api/ticket', ticketRoutes);

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
