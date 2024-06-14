const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();

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

module.exports = app;
