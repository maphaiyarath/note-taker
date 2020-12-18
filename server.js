var express = require("express");

// create an Express server
var app = express();

// set up an initial port
var PORT = process.env.PORT || 8080;

// set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// tell the server to fetch assets from public folder
app.use(express.static('public'));

// ROUTES to point the server to
// tells the server how to respond when users visit or request data from various URLs
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// start the Express server
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT);
});