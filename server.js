var express = require('express');
var path = require('path');
var http = require('http');
// Mustache
var h4e = require('h4e');

var app = express();

// Configure Mustache
var h4eRender = h4e.setup({
  extension: 'mustache',
  baseDir: 'views'
});

// Configuration
app.configure(function(){
  app.set('port', process.env.PORT || 3010);
  app.set('views', __dirname + '/views');
  // disable layout
  app.set('view options', {layout:false});
  // change view engine to mustache
  app.engine('mustache', h4eRender);
  app.set('view engine', 'mustache');
  //app.set('views', 'templates');

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
var routes = require('./routes/index');
app.get('/', routes.index);
var jobs = require('./api/jobs');
app.get('/jobs', jobs.findAll);
app.get('/jobs/:id', jobs.findById);
app.post('/jobs', jobs.addItem);
app.put('/jobs/:id', jobs.updateItem);
app.delete('/jobs/:id', jobs.deleteItem);

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
