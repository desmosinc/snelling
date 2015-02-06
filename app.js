// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

// Shiny new app
var app = express();

// Set up the Jade view engine and let it know where we're stashing our views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Serve the favicon
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Serve static assets from the public/ folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/about', function(req, res) {
    res.render('about');
});

// Last stop for middleware...if we get to here, the route is no good
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

// Set the port based on the environment
var port = Number(process.env.PORT || 3000);

// Start the show
app.listen(port, function() {
    console.log('Some cool stuff is happening over on port ' +port+ ' that you should check out...');
    console.log('Once you\'ve had enough coolness, hit Ctrl-c to exit.');    
});

module.exports = app;
