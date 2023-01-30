require('dotenv').config();
const path = require('path');
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes/route-index')
const cors = require('cors');
const corsOptions = require('./app/config/corsOptions');
const verifyJWT = require('./app/middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./app/middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./app/config/dbConn');
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

// Connect to MongoDB
connectDB();

// HTTP Logger
app.use(morgan('combined'));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

// middleware for json
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
});