const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes); 
const authRoutes = require('./routes/authRoutes');


app.use('/api/auth', authRoutes);
app.use('/api/applications', require('./routes/applicationRoutes'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));