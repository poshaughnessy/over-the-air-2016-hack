var util = require('util');
var os = require('os');

var bleno = require('bleno');

var Descriptor = bleno.Descriptor;
var Characteristic = bleno.Characteristic;

var RemoteCharacteristic = function() {
  RemoteCharacteristic.super_.call(this, {
    uuid: 'C2CF',
    properties: ['read', 'write', 'writeWithoutResponse'],
    descriptors: [
      new Descriptor({
        uuid: 'C2CE',
        value: 'Remote control'
      })
    ]
  });
};

util.inherits(RemoteCharacteristic, Characteristic);

RemoteCharacteristic.prototype.onReadRequest = function(offset, callback) {
  // return hardcoded value just for testing
  callback(this.RESULT_SUCCESS, new Buffer([98]));
};

RemoteCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var button = data.readUInt8(0);
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
};

module.exports = RemoteCharacteristic;
