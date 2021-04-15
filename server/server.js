require('dotenv').config({ path: './config.env' });
const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error ${err}`);
  server.close(() => process.exit(1));
});
