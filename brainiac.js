/**
 *
 *  Brainiac Model
 *
 */
var exec = require('child_process').exec;

var Brainiac = {
  setup: function(pin, mode) {
    exec('gpio -g mode ' + pin + ' ' + mode);
  },
  write: function(pin, value) {
    exec('gpio -g mode ' + pin + ' ' + value);
  }
};

module.exports = Brainiac;