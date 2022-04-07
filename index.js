require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const loggerStream = require('./utils/handleLogger');
const morganBody = require('morgan-body');

const app = express();

app.use(cors());
app.use(express.json());

// Static assets
app.use(express.static('storage'));

// Morgan config
morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400;
  }
});

// Routes
app.use('/api', require('./routes/index.routes'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running in ${port} http://localhost:${port}`);
});

dbConnect();