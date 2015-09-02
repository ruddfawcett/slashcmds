module.exports = {
  process: function(request, response) {
    var zip = parseInt(request.body.text, 10);
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

    if (typeof zip === 'number') {
      var request = require('request');

      request(url+zip, function (error, result, body) {
        if (!error && result.statusCode == 200) {
          var weather = JSON.parse(body);

          var description = weather['weather'][0]['description'];
          var locale = weather['name'];
          var current = weather['main']['temp'];
          var high = weather['main']['temp_max'];
          var low = weather['main']['temp_min'];

          function toFahrenheit(kelvin) {
            return Math.round((kelvin * (9/5)) - 459.67);
          }

          response.send('Looks like the weather in ' + locale + ' is: *' + description.toLowerCase() + '*. The current temperature is *' + toFahrenheit(current) + '*, with a high of *' + toFahrenheit(high) + '*, and a low of *' + toFahrenheit(low) + '*.');
        }
        else {
          response.send('There was an error retrieving your weather.');
        }
      })
    }
    else {
      response.send('This slash command currently doesn\'t support non zip codes.');
    }
  }
}
