require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');

const app = express();

app.use(cors());
app.use(express.json());

// Static assets
app.use(express.static('storage'));

// Routes
app.use('/api', require('./routes/index.routes'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running in ${port} http://localhost:${port}`);
});

dbConnect();