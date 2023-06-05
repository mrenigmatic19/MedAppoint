"use strict";

//----------------------------------Libraries------------------------------------------------
var express = require("express");

var path = require("path");

var bcrypt = require("bcrypt");

var session = require("express-session");

var flash = require("connect-flash");

var mongosession = require("connect-mongodb-session")(session);

var ejs = require("ejs"); //---------------------------------Hosting Port-----------------------------------------------


var port = 3000;
var hostname = '127.0.0.1';

require("./connection"); //--------------------------------Database Schema----------------------------------------------


var hospinfo = require("../database/hospitalschema");

var userinfo = require("../database/userschema");

var equipmentinfo = require("../database/equipmentschema");

var icubedinfo = require("../database/icubedsschema");

var appointmentinfo = require("../database/appointmentsschema");

var bedinfo = require("../database/bedschema");

var surgeryinfo = require("../database/surgeryschema"); //--------------------------------Database Link-----------------------------------------------


var store = new mongosession({
  uri: "mongodb://127.0.0.1:27017/MedAppoint",
  collection: "mysessions"
}); //---------------------------------Middleware-----------------------------------------------------

var app = express();
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({
  extended: false
}));
app.use(express["static"]("../public"));
app.use(session({
  secret: "MedAppoint",
  resave: false,
  saveUninitialized: false,
  store: store
})); //------------------------------------Engine Setting--------------------------------------------

var templatepath = path.join(__dirname, '../public');
app.set("view engine", "ejs");
app.set("views", templatepath); //----------------------------------Login Credential-----------------------------------------------

var loginuid = function loginuid(req, res, next) {
  var details;
  return regeneratorRuntime.async(function loginuid$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(userinfo.finOne(_id = req.session.loginhid));

        case 2:
          details = _context.sent;
          next();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

var loginhid = function loginhid(req, res, next) {
  var details;
  return regeneratorRuntime.async(function loginhid$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(hospinfo.finOne(_id = req.session.loginhid));

        case 2:
          details = _context2.sent;
          next();

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //----------------------------------Authorization-----------------------------------------------


var isAuth = function isAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
}; //--------------------------------------Index------------------------------------------------


app.get("/", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //---------------------------------Login Hopspital------------------------------------------------

app.get("/login_hospital", function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("login_hospital", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post("/login_hospital", function _callee3(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee3$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context5.sent;

          if (!chk) {
            _context5.next = 11;
            break;
          }

          _context5.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context5.sent;

          if (ismatch) {
            req.session.isAuth = true;
            req.session.loginhid = chk._id;
            res.redirect("hospitaldetails");
          } else {
            req.flash('msg', 'Wrong Password');
            res.redirect("login_hospital");
          }

          _context5.next = 13;
          break;

        case 11:
          req.flash('msg', 'Wrong Username');
          res.redirect("login_hospital");

        case 13:
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("login_hospital");

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //---------------------------------------Home User------------------------------------------

app.get("/home", isAuth, function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          res.render("home");

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //-------------------------------------Login User--------------------------------------------

app.get("/login_user", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          res.render("login_user", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.post("/login_user", function _callee6(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(userinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context8.sent;

          if (!chk) {
            _context8.next = 11;
            break;
          }

          _context8.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context8.sent;

          if (ismatch) {
            req.session.loginuid = chk.id;
            console.log();
            req.session.isAuth = true;
            res.redirect("home");
          } else {
            req.flash('msg', 'Wrong Password');
            res.redirect("login_user");
          }

          _context8.next = 13;
          break;

        case 11:
          req.flash('msg', 'Wrong Username');
          res.redirect("login_user");

        case 13:
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          req.flash('msg', 'Enter Details');
          res.redirect("login_user");

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //--------------------------------About-Contact-explore-------------------------------------------------

app.get("/about", function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res.render("about");

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get("/contactUs", function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          res.render("contactUs", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get("/explore", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context11) {
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
app.get("/hospital", function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res.render("hospital");

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
}); //-----------------------------------Hospital Home----------------------------------------------

app.get("/hospitaldetails", isAuth, function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          console.log(req.session.loginhid);
          res.render("hospitaldetails");

        case 2:
        case "end":
          return _context13.stop();
      }
    }
  });
}); //---------------------------------Sign up Hospital------------------------------------------------

app.get("/signup_hospital", function _callee12(req, res) {
  return regeneratorRuntime.async(function _callee12$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          res.render("signup_hospital", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post("/signup_hospital", function _callee13(req, res) {
  var chk, hashpwd, cpass, newhospreg;
  return regeneratorRuntime.async(function _callee13$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context15.sent;

          if (chk) {
            _context15.next = 22;
            break;
          }

          _context15.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 7:
          hashpwd = _context15.sent;
          _context15.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 10:
          cpass = _context15.sent;

          if (!cpass) {
            _context15.next = 18;
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
          _context15.next = 15;
          return regeneratorRuntime.awrap(hospinfo.insertMany([newhospreg]));

        case 15:
          res.redirect("login_hospital");
          _context15.next = 20;
          break;

        case 18:
          req.flash('msg', 'Re-enter password');
          res.redirect("Signup_hospital");

        case 20:
          _context15.next = 24;
          break;

        case 22:
          req.flash('msg', 'Already Registered');
          res.redirect("signup_hospital");

        case 24:
          _context15.next = 30;
          break;

        case 26:
          _context15.prev = 26;
          _context15.t0 = _context15["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("signup_hospital");

        case 30:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); //-------------------------------Sign Up User--------------------------------------------------

app.get("/signup_user", function _callee14(req, res) {
  return regeneratorRuntime.async(function _callee14$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          res.render("signup_user", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.post("/signup_user", function _callee15(req, res) {
  var chk, hashpwd, cpass, newuserreg;
  return regeneratorRuntime.async(function _callee15$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context17.sent;

          if (chk) {
            _context17.next = 22;
            break;
          }

          _context17.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 7:
          hashpwd = _context17.sent;
          _context17.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 10:
          cpass = _context17.sent;

          if (!cpass) {
            _context17.next = 18;
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
          _context17.next = 15;
          return regeneratorRuntime.awrap(userinfo.insertMany([newuserreg]));

        case 15:
          res.redirect("login_user");
          _context17.next = 20;
          break;

        case 18:
          req.flash('msg', 'Re-enter Password');
          res.redirect("signup_user");

        case 20:
          _context17.next = 24;
          break;

        case 22:
          req.flash('msg', 'Already Registered');
          res.redirect("signup_user");

        case 24:
          _context17.next = 30;
          break;

        case 26:
          _context17.prev = 26;
          _context17.t0 = _context17["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("signup_user");

        case 30:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); //-------------------------------Equipment--------------------------------------------------

app.get("/equipments", isAuth, function _callee16(req, res) {
  return regeneratorRuntime.async(function _callee16$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          equipmentinfo.find({
            hospitalid: req.session.loginhid
          }).then(function (data) {
            res.render("equipments", {
              message: req.flash('msg'),
              data: data
            });
          })["catch"](function (y) {
            console.log(y);
          });

        case 1:
        case "end":
          return _context18.stop();
      }
    }
  });
});
app.post("/equipments", function _callee17(req, res) {
  var newequipmentreg;
  return regeneratorRuntime.async(function _callee17$(_context19) {
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
}); //------------------------------IcuBeds---------------------------------------------------

app.get("/icubeds", isAuth, function _callee18(req, res) {
  return regeneratorRuntime.async(function _callee18$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          icubedinfo.find({
            hospitalid: req.session.loginhid
          }).then(function (data) {
            res.render("icubeds", {
              message: req.flash('msg'),
              data: data
            });
          })["catch"](function (y) {
            console.log(y);
          });

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
});
app.post("/icubeds", function _callee19(req, res) {
  var newicubedreg;
  return regeneratorRuntime.async(function _callee19$(_context21) {
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
          req.flash('msg', 'Successfully Registered');
          res.redirect("icubeds");

        case 5:
        case "end":
          return _context21.stop();
      }
    }
  });
}); //----------------------------Appointment-----------------------------------------------------

app.get("/appointments", isAuth, function _callee20(req, res) {
  return regeneratorRuntime.async(function _callee20$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          appointmentinfo.find({
            hospitalid: req.session.loginhid
          }).then(function (data) {
            res.render("appointments", {
              message: req.flash('msg'),
              data: data
            });
          })["catch"](function (y) {
            console.log(y);
          });

        case 1:
        case "end":
          return _context22.stop();
      }
    }
  });
});
app.post("/appointments", function _callee21(req, res) {
  var newappointmentreg;
  return regeneratorRuntime.async(function _callee21$(_context23) {
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
          req.flash('msg', 'Successfully Registered');
          res.redirect("appointments");

        case 5:
        case "end":
          return _context23.stop();
      }
    }
  });
}); //-------------------------------Beds--------------------------------------------------

app.get("/beds", isAuth, function _callee22(req, res) {
  return regeneratorRuntime.async(function _callee22$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          bedinfo.find({
            hospitalid: req.session.loginhid
          }).then(function (data) {
            res.render("beds", {
              message: req.flash('msg'),
              data: data
            });
          })["catch"](function (y) {
            console.log(y);
          });

        case 1:
        case "end":
          return _context24.stop();
      }
    }
  });
});
app.post("/beds", function _callee23(req, res) {
  var newbedreg;
  return regeneratorRuntime.async(function _callee23$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          newbedreg = new bedinfo({
            hospitalid: req.session.loginhid,
            publicward: req.body.publicward,
            privateward: req.body.privateward,
            wards: req.body.ward,
            disease: req.body.disease
          });
          _context25.next = 3;
          return regeneratorRuntime.awrap(bedinfo.insertMany([newbedreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("beds");

        case 5:
        case "end":
          return _context25.stop();
      }
    }
  });
}); //--------------------------------Surgeries-----------------------------------------------

app.get("/surgeries", isAuth, function _callee24(req, res) {
  return regeneratorRuntime.async(function _callee24$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          surgeryinfo.find({
            hospitalid: req.session.loginhid
          }).then(function (data) {
            res.render("surgeries", {
              message: req.flash('msg'),
              data: data
            });
          })["catch"](function (y) {
            console.log(y);
          });

        case 1:
        case "end":
          return _context26.stop();
      }
    }
  });
});
app.post("/surgeries", function _callee25(req, res) {
  var newsurgeryreg;
  return regeneratorRuntime.async(function _callee25$(_context27) {
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
          req.flash('msg', 'Successfully Registered');
          res.redirect("surgeries");

        case 5:
        case "end":
          return _context27.stop();
      }
    }
  });
}); //-------------------------------Logout Key--------------------------------------------------

app.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.redirect("/");
  });
}); //--------------------------------Hosting-------------------------------------------------

app.listen(port, hostname, function () {
  console.log("Server is Running!");
});