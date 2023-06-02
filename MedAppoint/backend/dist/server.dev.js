"use strict";

var express = require("express");

var app = express();
var port = 3000;
var hostname = '127.0.0.1';

var path = require("path");

var hbs = require('hbs');

require("./connection");

var bcrypt = require("bcrypt");

var session = require("express-session");

var hospinfo = require("../database/hospitalschema");

var userinfo = require("../database/userschema");

var equipmentinfo = require("../database/equipmentschema");

var icubedinfo = require("../database/icubedsschema");

var appointmentinfo = require("../database/appointmentsschema");

var bedinfo = require("../database/bedschema");

var surgeryinfo = require("../database/surgeryschema");

var mongosession = require("connect-mongodb-session")(session);

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var store = new mongosession({
  uri: "mongodb://127.0.0.1:27017/MedAppoint",
  collection: "mysessions"
});
app.use(session({
  secret: "MedAppoint",
  resave: false,
  saveUninitialized: false,
  store: store
}));
var templatepath = path.join(__dirname, '../public');
app.use(express["static"]("../public"));
app.set("view engine", "hbs");
app.set("views", templatepath);

var loginhid = function loginhid(req, res, next) {
  var details;
  return regeneratorRuntime.async(function loginhid$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(hospinfo.finOne(_id = req.session.loginhid));

        case 2:
          details = _context.sent;
          console.log(details);
          next();

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var isAuth = function isAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/ ");
  }
};

app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get("/login_hospital", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("login_hospital");

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post("/login_hospital", function _callee3(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context4.sent;

          if (!chk) {
            res.redirect("login");
          }

          _context4.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context4.sent;

          if (ismatch) {
            req.session.isAuth = true;
            req.session.loginhid = chk._id;
            res.redirect("hospitaldetails");
          } else {
            res.send("wrong password");
          }

          _context4.next = 14;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          res.send("wrong details");

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
app.get("/home", isAuth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          res.render("home");

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/login_user", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.render("login_user");

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.post("/login_user", function _callee6(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee6$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(userinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context7.sent;

          if (!chk) {
            res.redirect("login");
          }

          _context7.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context7.sent;

          if (ismatch) {
            req.session.loginuid = chk.id;
            console.log();
            req.session.isAuth = true;
            res.redirect("home");
          } else {
            res.send("wrong password");
          }

          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          res.send("wrong details");

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
app.get("/about", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render("about");

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/contactUs", function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res.render("contactUs");

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get("/explore", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.render("explore");

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get("/hospital", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          res.render("hospital");

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.get("/explore", function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res.render("explore");

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.get("/signup_hospital", function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          res.render("signup_hospital");

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.get("/hospitaldetails", isAuth, function _callee13(req, res) {
  return regeneratorRuntime.async(function _callee13$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          console.log(req.session.loginhid);
          res.render("hospitaldetails");

        case 2:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post("/signup_hospital", function _callee14(req, res) {
  var hashpwd, cpass, newhospreg;
  return regeneratorRuntime.async(function _callee14$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 2:
          hashpwd = _context15.sent;
          _context15.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 5:
          cpass = _context15.sent;

          if (!cpass) {
            _context15.next = 13;
            break;
          }

          newhospreg = new hospinfo({
            hospitalname: req.body.hospitalname,
            email: req.body.email,
            contact: req.body.contact,
            org: req.body.org,
            pin: req.body.pin,
            establishedin: req.body.establishedin,
            password: hashpwd,
            description: "hlo",
            address: req.body.address
          });
          _context15.next = 10;
          return regeneratorRuntime.awrap(hospinfo.insertMany([newhospreg]));

        case 10:
          res.redirect("login_hospital");
          _context15.next = 14;
          break;

        case 13:
          res.send("password is not matching");

        case 14:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.get("/signup_user", function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          res.render("signup_user");

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.post("/signup_user", function _callee16(req, res) {
  var hashpwd, cpass, newuserreg;
  return regeneratorRuntime.async(function _callee16$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 2:
          hashpwd = _context17.sent;
          _context17.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 5:
          cpass = _context17.sent;

          if (!cpass) {
            _context17.next = 13;
            break;
          }

          newuserreg = new userinfo({
            username: req.body.username,
            email: req.body.email,
            contact: req.body.contact,
            dob: req.body.dob,
            pin: req.body.pin,
            gender: req.body.gender,
            password: hashpwd,
            address: req.body.address
          });
          _context17.next = 10;
          return regeneratorRuntime.awrap(userinfo.insertMany([newuserreg]));

        case 10:
          res.redirect("login_user");
          _context17.next = 14;
          break;

        case 13:
          res.send("password is not matching");

        case 14:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app.get("/equipments", isAuth, function _callee17(req, res) {
  return regeneratorRuntime.async(function _callee17$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          res.render("equipments");

        case 1:
        case "end":
          return _context18.stop();
      }
    }
  });
});
app.post("/equipments", function _callee18(req, res) {
  var newequipmentreg;
  return regeneratorRuntime.async(function _callee18$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          newequipmentreg = new equipmentinfo({
            hospitalid: req.session.loginhid,
            instrumentname: req.body.instrumentname,
            type: req.body.type,
            availability: req.body.availability
          });
          _context19.next = 3;
          return regeneratorRuntime.awrap(equipmentinfo.insertMany([newequipmentreg]));

        case 3:
          res.redirect("equipments");

        case 4:
        case "end":
          return _context19.stop();
      }
    }
  });
});
app.get("/icubeds", isAuth, function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          res.render("icubeds");

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
});
app.post("/icubeds", function _callee20(req, res) {
  var newicubedreg;
  return regeneratorRuntime.async(function _callee20$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          newicubedreg = new icubedinfo({
            hospitalid: req.session.loginhid,
            cost: req.body.cost,
            beds: req.body.beds
          });
          _context21.next = 3;
          return regeneratorRuntime.awrap(icubedinfo.insertMany([newicubedreg]));

        case 3:
          res.redirect("icubeds");

        case 4:
        case "end":
          return _context21.stop();
      }
    }
  });
});
app.get("/appointments", isAuth, function _callee21(req, res) {
  return regeneratorRuntime.async(function _callee21$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          res.render("appointments");

        case 1:
        case "end":
          return _context22.stop();
      }
    }
  });
});
app.post("/appointments", function _callee22(req, res) {
  var newappointmentreg;
  return regeneratorRuntime.async(function _callee22$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          newappointmentreg = new appointmentinfo({
            hospitalid: req.session.loginhid,
            doctor: req.body.doctor,
            specialist: req.body.specialist,
            cost: req.body.cost,
            yoe: req.body.yoe,
            bookingslot: req.body.bookingslot
          });
          _context23.next = 3;
          return regeneratorRuntime.awrap(appointmentinfo.insertMany([newappointmentreg]));

        case 3:
          res.redirect("appointments");

        case 4:
        case "end":
          return _context23.stop();
      }
    }
  });
});
app.get("/beds", isAuth, function _callee23(req, res) {
  return regeneratorRuntime.async(function _callee23$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          res.render("beds");

        case 1:
        case "end":
          return _context24.stop();
      }
    }
  });
});
app.post("/beds", function _callee24(req, res) {
  var newbedreg;
  return regeneratorRuntime.async(function _callee24$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          newbedreg = new bedinfo({
            hospitalid: req.session.loginhid,
            publicward: req.body.publicward,
            privateward: req.body.privateward,
            wards: req.body.wards,
            disease: req.body.disease
          });
          _context25.next = 3;
          return regeneratorRuntime.awrap(bedinfo.insertMany([newbedreg]));

        case 3:
          res.redirect("beds");

        case 4:
        case "end":
          return _context25.stop();
      }
    }
  });
});
app.get("/surgeries", isAuth, function _callee25(req, res) {
  return regeneratorRuntime.async(function _callee25$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          res.render("surgeries");

        case 1:
        case "end":
          return _context26.stop();
      }
    }
  });
});
app.post("/surgeries", function _callee26(req, res) {
  var newsurgeryreg;
  return regeneratorRuntime.async(function _callee26$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          newsurgeryreg = new surgeryinfo({
            hospitalid: req.session.loginhid,
            doctor: req.body.doctor,
            specialist: req.body.specialist,
            cost: req.body.cost,
            yoe: req.body.yoe
          });
          _context27.next = 3;
          return regeneratorRuntime.awrap(surgeryinfo.insertMany([newsurgeryreg]));

        case 3:
          res.redirect("surgeries");

        case 4:
        case "end":
          return _context27.stop();
      }
    }
  });
});
app.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.redirect("/");
  });
});
app.listen(port, hostname, function () {
  console.log("Server is Running!");
});