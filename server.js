const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
 
}).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => console.error(err));
