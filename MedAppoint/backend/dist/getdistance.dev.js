"use strict";

var axios = require('axios');

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var radius = 6371; // Radius of the earth in km

  var latitudeDifference = deg2rad(lat2 - lat1); // deg2rad below

  var longitudeDifference = deg2rad(lon2 - lon1);
  console.log(latitudeDifference, longitudeDifference);
  var a = Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = radius * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

var calculate = function calculate(pincode1, pincode2, data) {
  var latitude1 = data[pincode1].latitude;
  var longitude1 = data[pincode1].longitude;
  var latitude2 = data[pincode2].latitude;
  var longitude2 = data[pincode2].longitude;
  var distance = getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2);
  console.log(pincode1, pincode2, data);
  return distance;
};

var getDistance = function getDistance(pincode1, pincode2) {
  return regeneratorRuntime.async(function getDistance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(axios.get('./pincode.json').then(function (response) {
            console.log(pincode1, pincode2, "1");
            var result = calculate(pincode1, pincode2, response.data);
            return result;
          })["catch"](function (error) {
            return console.log(error.response);
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

console.log(getDistance('382445', '110021'));
module.exports = {
  getDistance: getDistance
};