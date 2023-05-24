"use strict";

var express = require("express");

var http = require("http");

var app = express();
var port = 3000;
var hostname = '127.0.0.1';

var path = require("path");

var hbs = require('hbs');

var hospinfo = require("./connection");

var _require = require("crypto"),
    checkPrime = _require.checkPrime;

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var templatepath = path.join(__dirname, '../public');
app.use(express["static"]("../public"));
app.set("view engine", "hbs");
app.set("views", templatepath);
app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/login_hospital", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("login_hospital");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/login_hospital", function _callee3(req, res) {
  var chk;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context3.sent;

          if (chk.password === req.body.password) {
            res.render("home");
          } else {
            res.send("wrong password");
          }

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.send("wrond details");

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/login_user", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("login_user");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/about", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("about");

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/contactUs", function _callee6(req, res) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.render("contactUs");

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.get("/explore", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.render("explore");

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get("/hospital", function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render("hospital");

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/explore", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res.render("explore");

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get("/signup_hospital", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.render("signup_hospital");

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.post("/signup_hospital", function _callee11(req, res) {
  var pass, cpass, newhospreg;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          pass = req.body.password;
          cpass = req.body.confirmpassword;

          if (!(pass === cpass)) {
            _context11.next = 9;
            break;
          }

          newhospreg = new hospinfo({
            hospitalname: req.body.hospitalname,
            email: req.body.email,
            contact: req.body.contact,
            org: req.body.org,
            pin: req.body.pin,
            establishedin: req.body.establishedin,
            password: req.body.password,
            description: "hlo",
            address: req.body.address
          });
          _context11.next = 6;
          return regeneratorRuntime.awrap(hospinfo.insertMany([newhospreg]));

        case 6:
          res.render("login_hospital");
          _context11.next = 10;
          break;

        case 9:
          res.send("password is not matching");

        case 10:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.get("/signup_user", function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res.render("signup_user");

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.listen(port, hostname, function () {
  console.log("Server is Running!");
});