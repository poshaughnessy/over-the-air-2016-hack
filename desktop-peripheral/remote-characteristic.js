var util = require('util');
var os = require('os');
var exec = require('child_process').exec;

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var RemoteCharacteristic = function() {
  RemoteCharacteristic.super_.call(this, {
    uuid: '2A19',
    properties: ['read', 'write'],
    descriptors: [
      new Descriptor({
        uuid: '2901',
        value: 'Remote control'
      })
    ]
  });
};

util.inherits(RemoteCharacteristic, Characteristic);

RemoteCharacteristic.prototype.onReadRequest = function(offset, callback) {
  // return hardcoded value just for testing
  console.log('read');
  callback(this.RESULT_SUCCESS, new Buffer([98]));
};

RemoteCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('1');
  if (offset) {
    console.log('2');
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    console.log('3');
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    console.log('4');
    var button = data.getUint8(0);
    console.log('button', button);
    switch (button) {
      case 1:
        console.log('left');
        break;
      case 2:
        console.log('right');
        break;
      default:
        console.log('other');
        break;
    }
    callback(this.RESULT_SUCCESS);
  }
  console.log('5');
};

module.exports = RemoteCharacteristic;
