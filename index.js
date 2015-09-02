var express = require('express'),
	parser = require('body-parser');

// Commands
var weather = require('./commands/weather'),
	isitup = require('./commands/isitup');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true
}));

app.get('/', function(request, response) {
  response.send('Sorry, nothing here!');
})

app.post('/weather', weather.process);
app.post('/isitup', isitup.process);

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
})
