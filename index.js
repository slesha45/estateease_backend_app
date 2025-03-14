// importing the pacakages(express)
const express = require("express");
// const mongoose = require("mongoose");
const connectDatabase = require("./database/database");
const dotenv = require("dotenv")
const cors = require("cors")
const acceptFormData = require('express-fileupload')
const https = require('https')
const fs = require('fs')
const path = require('path');
const mongoSanitize = require("express-mongo-sanitize");

// Creating an express application
const app = express();

//Configure Cors Policy
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))

//Express Json Config
app.use(express.json())

//Config form data
app.use(acceptFormData())

//Make a static public folder
app.use(express.static("./public"))

// Apply express-mongo-sanitize middleware
app.use(
  mongoSanitize({
    replaceWith: '_',
  })
);

// dotenv configuration
dotenv.config()

//Defining the port
const PORT = process.env.PORT;
// Connecting  to Database
connectDatabase();

// Configuring Routes of User

app.use('/api/user', require('./routes/userRoutes'))

app.use('/api/property', require('./routes/propertyRoutes'))

app.use(`/api/wishlist`, require('./routes/wishlistRoute'))

app.use('/api/booking', require('./routes/bookingRoute'))

app.use('/api/contact', require('./routes/contactRoute'))

app.use('/api/rating', require("./routes/reviewRoute"));

app.use('/api/payment', require('./routes/PaymentRoute'))


const options = {
  key: fs.readFileSync(path.resolve(__dirname, "server.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "server.crt")),

};

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Secure server is running on port ${PORT}`);
});

module.exports = app;