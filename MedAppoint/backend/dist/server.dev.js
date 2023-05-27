"use strict";

var express = require("express");

var http = require("http");

var app = express();
var port = 3000;
var hostname = '127.0.0.1';

var path = require("path");

var hbs = require('hbs');

require("./connection");

var hospinfo = require("../database/hospitalschema");

var userinfo = require("../database/userschema");

var equipmentinfo = require("../database/equipmentschema");

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
            res.redirect("home");
          } else {
            res.send("wrong password");
          }

          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.send("wrong details");

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/home", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("home");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/login_user", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("login_user");

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post("/login_user", function _callee6(req, res) {
  var chk;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(userinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context6.sent;

          if (chk.password === req.body.password) {
            res.redirect("home");
          } else {
            res.send("wrong password");
          }

          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.send("wrong details");

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.get("/about", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.render("about");

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get("/contactUs", function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render("contactUs");

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
app.get("/hospital", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.render("hospital");

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get("/explore", function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          res.render("explore");

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.get("/signup_hospital", function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res.render("signup_hospital");

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.post("/signup_hospital", function _callee13(req, res) {
  var pass, cpass, newhospreg;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          pass = req.body.password;
          cpass = req.body.confirmpassword;

          if (!(pass === cpass)) {
            _context13.next = 9;
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
          _context13.next = 6;
          return regeneratorRuntime.awrap(hospinfo.insertMany([newhospreg]));

        case 6:
          res.redirect("login_hospital");
          _context13.next = 10;
          break;

        case 9:
          res.send("password is not matching");

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.get("/signup_user", function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          res.redirect("signup_user");

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post("/signup_user", function _callee15(req, res) {
  var pass, cpass, newuserreg;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          pass = req.body.password;
          cpass = req.body.confirmpassword;

          if (!(pass === cpass)) {
            _context15.next = 9;
            break;
          }

          newuserreg = new userinfo({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            dob: req.body.dob,
            pin: req.body.pin,
            gender: req.body.gender,
            password: req.body.password,
            address: req.body.address
          });
          _context15.next = 6;
          return regeneratorRuntime.awrap(userinfo.insertMany([newuserreg]));

        case 6:
          res.redirect("login_user");
          _context15.next = 10;
          break;

        case 9:
          res.send("password is not matching");

        case 10:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.get("/equipments", function _callee16(req, res) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          res.render("equipments");

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.post("/equipments", function _callee17(req, res) {
  var newequipmentreg;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          newequipmentreg = new equipmentinfo({
            hospitalid: "hlo",
            instrumentname: req.body.instrumentname,
            type: req.body.type,
            availability: req.body.availability
          });
          _context17.next = 3;
          return regeneratorRuntime.awrap(equipmentinfo.insertMany([newequipmentreg]));

        case 3:
          res.redirect("equipments");

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app.listen(port, hostname, function () {
  console.log("Server is Running!");
});