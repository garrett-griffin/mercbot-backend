const express = require('express');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`MercBot backend listening at http://localhost:${port}`);
});
