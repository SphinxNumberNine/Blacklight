const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');
require('./models/User');

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true });

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes/test')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 5000; // if process.env.PORT is undefined, the port is set to 5000 by default
app.listen(PORT);
