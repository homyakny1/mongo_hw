var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

// var PORT = 3004;
var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries, we're setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;

mongoose.connect(
    process.env.MONGOLAB_CYAN_URI || "mongodb://localhost/mongo_hw",
    function (err) {
        if (err) throw err;
    }
);
// Routes
require("./routing/apiRoutes")(app);
require("./routing/htmlRouter")(app);
// A GET route for scraping the echojs website


// Route for getting all Articles from the db


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
