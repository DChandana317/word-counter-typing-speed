const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

// 1. CORS MUST BE FIRST
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// 2. PARSERS MUST BE SECOND (Before routes)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 3. ROUTES MUST BE LAST
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/scores', require('./routes/scoreRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Engine running on port ${PORT}`));
