/**
 *
 *  Brainiac Model
 *
 */
var exec = require('child_process').exec;

var Brainiac = {
  verification: {
    getMode: function(mode) {
      if (mode === 'in' || mode === 'input') return 'in';
      if (mode === 'out' || mode === 'output') return 'out';
      return false;
    },
    getPinValue: function(pinValue) {
      let parsedPinValue = parseInt(pinValue);
      return (parsedPinValue === 0 || parsedPinValue === 1) ? parsedPinValue : false;
    }
  },
  setup: function(pin, mode) {
    exec('gpio -g mode ' + pin + ' ' + mode);
  },
  write: function(pin, value) {
    exec('gpio -g mode ' + pin + ' ' + value);
  }
};

module.exports = Brainiac;