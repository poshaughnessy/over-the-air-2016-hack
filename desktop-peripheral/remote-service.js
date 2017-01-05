var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var RemoteCharacteristic = require('./remote-characteristic');

function RemoteService() {
  RemoteService.super_.call(this, {
    uuid: 'B1BF',
    characteristics: [
      new RemoteCharacteristic()
    ]
  });
}

util.inherits(RemoteService, BlenoPrimaryService);

module.exports = RemoteService;
