const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const cron = require('node-cron');
const syncTurnData = require('./tasks/turnSync'); // Adjust path if necessary

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Set up CORS to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:3001', // Replace with the URL of your frontend
    credentials: true,
}));

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`MercBot backend listening at http://localhost:${port}`);
});

// Schedule the task to run at 30 seconds after the hour
cron.schedule('30 * * * *', async () => {
    console.log('Running sync task...');
    await syncTurnData();
});

module.exports = app;
