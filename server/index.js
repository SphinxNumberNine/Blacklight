const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

var app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require("./routes/test")(app);

const PORT = process.env.PORT || 5000; // if process.env.PORT is undefined, the port is set to 5000 by default
app.listen(PORT);
