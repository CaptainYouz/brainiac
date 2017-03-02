var app    = require('express')();
var server = require('http').createServer(app);
var io     = require('socket.io')(server);
var router = require('express').Router();

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
});

app.use('/', router);

server.listen(1958);