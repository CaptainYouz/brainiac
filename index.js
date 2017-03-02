var app    = require('express')();
var server = require('http').createServer(app);
var io     = require('socket.io')(server);
var router = require('express').Router();

var Brainiac = require('./brainiac.js');

router.get('/', function(req, res) {
  res.status(200).json(
    {
      message: 'Welcom to Brainiac, an interactive interface for controlling a Raspberry PI through websocket.',
      port: 1958
    }
  );
});

io.on('connection', function(client) {
  console.log('New connexion of: ', client.id);

  client.on('setup', function(datas) {
    console.log('setup datas:', datas);

    if (typeof(datas) === 'object') {
      if (!Array.isArray(datas)) datas = [datas];

      datas.forEach(function(data) {
        var mode = Brainiac.verification.getMode(data.mode);

        if (mode) Brainiac.setup(data.pinNumber, mode);
      });
    }
  });

  client.on('write', function(datas) {
    console.log('write datas:', datas);

    if (typeof(datas) === 'object') {
      if (!Array.isArray(datas)) datas = [datas];

      datas.forEach(function(data) {
        var pinValue = Brainiac.verification.getPinValue(data.value);

        if (pinValue === 0 || pinValue === 1) Brainiac.write(data.pinNumber, pinValue);
      });
    }
  });
});

app.use('/', router);

server.listen(1958);