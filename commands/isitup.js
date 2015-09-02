module.exports = {
  process: function(request, response) {
    var site = request.body.text;
    var url = 'http://isitup.org/' + site + '.json';

    var request = require('request');

    request(url, function (error, result, body) {
      if (!error && result.statusCode == 200) {
        var response = JSON.parse(body);

        var status = response['status_code'];

        if (status == 1) {
          response.send(site + 'is *up*, you might want to check your connection if you are unable to reach it.');
        }
        else if (status == 2) {
          response.send(site + 'is *down* -- it\'s not just you.');
        }
        else if (status == 3) {
          response.send(site + 'is not a valid domain, please follow the format `test.com`.');
        }
      }
      else {
        response.send('In an ironic twist, we were unable to reach isitup.org.');
      }
    });
  }
}
