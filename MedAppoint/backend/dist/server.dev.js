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

require("./connection"); //--------------------------------Database Schema---------------------------------------------


var hospinfo = require("../database/hospitalschema");

var userinfo = require("../database/userschema");

var equipmentinfo = require("../database/equipmentschema");

var icubedinfo = require("../database/icubedsschema");

var appointmentinfo = require("../database/appointmentsschema");

var bedinfo = require("../database/bedschema");

var surgeryinfo = require("../database/surgeryschema");

var _require = require("./getdistance"),
    getDistance = _require.getDistance; //--------------------------------Database Link-----------------------------------------------


var store = new mongosession({
  uri: "mongodb://127.0.0.1:27017/MedAppoint",
  collection: "mysessions"
}); //---------------------------------Middleware--------------------------------------------------

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
})); //------------------------------------Engine Setting------------------------------------------

var templatepath = path.join(__dirname, '../public');
app.set("view engine", "ejs");
app.set("views", templatepath); //----------------------------------Login Credential------------------------------------------

var loginuid = function loginuid(req, res, next) {
  return regeneratorRuntime.async(function loginuid$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          next();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var loginhid = function loginhid(req, res, next) {
  return regeneratorRuntime.async(function loginhid$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          next();

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var detail = function detail(req, res, next) {
  return regeneratorRuntime.async(function detail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          next();

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var value = function value(req, res, next) {
  return regeneratorRuntime.async(function value$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          next();

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //----------------------------------Authorization---------------------------------------------


var isAuth = function isAuth(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
}; //----------------------------------Searching Algorithm----------------------------------------


app.get("/searching", isAuth, function _callee(req, res) {
  var array, val, details, user, pin1, i, h, pin2, distance, _i, min, j, tmp;

  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          array = [];
          val = req.session.value;

          if (!req.session.detail) {
            _context5.next = 23;
            break;
          }

          details = req.session.detail;
          _context5.next = 6;
          return regeneratorRuntime.awrap(userinfo.find({
            _id: req.session.loginuid
          }));

        case 6:
          user = _context5.sent;
          pin1 = user[0].pin;
          i = 0;

        case 9:
          if (!(i < details.length)) {
            _context5.next = 21;
            break;
          }

          _context5.next = 12;
          return regeneratorRuntime.awrap(hospinfo.find({
            _id: details[i].hospitalid
          }));

        case 12:
          h = _context5.sent;
          pin2 = h[0].pin;
          _context5.next = 16;
          return regeneratorRuntime.awrap(getDistance(pin1, pin2));

        case 16:
          distance = _context5.sent;
          array.push([details[i], h[0], distance]);

        case 18:
          i++;
          _context5.next = 9;
          break;

        case 21:
          for (_i = 0; _i < array.length; _i++) {
            min = _i;

            for (j = _i + 1; j < array.length; j++) {
              if (array[j][2] < array[min][2]) {
                min = j;
              }
            }

            if (min != _i) {
              tmp = array[_i];
              array[_i] = array[min];
              array[min] = tmp;
            }
          }

          console.log(array);

        case 23:
          res.render("searching", {
            message: req.flash('msg'),
            array: array,
            val: val
          });

        case 24:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.post("/searching", function _callee3(req, res) {
  var val, string;
  return regeneratorRuntime.async(function _callee3$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          val = req.body.value;

          if (!val) {
            _context7.next = 13;
            break;
          }

          string = req.body.search;

          if (!string) {
            _context7.next = 9;
            break;
          }

          _context7.next = 7;
          return regeneratorRuntime.awrap(function _callee2() {
            var array, a, i, table, _table, _table2, _table3, _table4;

            return regeneratorRuntime.async(function _callee2$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    array = string.split(' ');
                    a = [];
                    i = 0;

                  case 3:
                    if (!(i < array.length)) {
                      _context6.next = 39;
                      break;
                    }

                    if (!(val == 4)) {
                      _context6.next = 11;
                      break;
                    }

                    _context6.next = 7;
                    return regeneratorRuntime.awrap(appointmentinfo.find({
                      specialist: array[i]
                    }));

                  case 7:
                    table = _context6.sent;
                    table.forEach(function (x) {
                      a.push(x);
                    });
                    _context6.next = 36;
                    break;

                  case 11:
                    if (!(val == 1)) {
                      _context6.next = 18;
                      break;
                    }

                    _context6.next = 14;
                    return regeneratorRuntime.awrap(equipmentinfo.find({
                      $or: [{
                        instrumentname: array[i]
                      }, {
                        type: array[i]
                      }]
                    }));

                  case 14:
                    _table = _context6.sent;

                    _table.forEach(function (x) {
                      a.push(x);
                    });

                    _context6.next = 36;
                    break;

                  case 18:
                    if (!(val == 0)) {
                      _context6.next = 25;
                      break;
                    }

                    _context6.next = 21;
                    return regeneratorRuntime.awrap(icubedinfo.find({}));

                  case 21:
                    _table2 = _context6.sent;

                    _table2.forEach(function (x) {
                      a.push(x);
                    });

                    _context6.next = 36;
                    break;

                  case 25:
                    if (!(val == 3)) {
                      _context6.next = 32;
                      break;
                    }

                    _context6.next = 28;
                    return regeneratorRuntime.awrap(bedinfo.find({
                      disease: array[i]
                    }));

                  case 28:
                    _table3 = _context6.sent;

                    _table3.forEach(function (x) {
                      a.push(x);
                    });

                    _context6.next = 36;
                    break;

                  case 32:
                    _context6.next = 34;
                    return regeneratorRuntime.awrap(surgeryinfo.find({
                      specialist: array[i]
                    }));

                  case 34:
                    _table4 = _context6.sent;

                    _table4.forEach(function (x) {
                      a.push(x);
                    });

                  case 36:
                    i++;
                    _context6.next = 3;
                    break;

                  case 39:
                    req.flash('msg', 'Searching Successful');
                    req.session.detail = a;
                    req.session.value = val;
                    res.redirect("searching");

                  case 43:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }());

        case 7:
          _context7.next = 11;
          break;

        case 9:
          req.flash('msg', 'Empty Search');
          res.redirect("searching");

        case 11:
          _context7.next = 15;
          break;

        case 13:
          req.flash('msg', 'Select respective field');
          res.redirect("searching");

        case 15:
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          req.flash('msg', 'Search Something');
          res.redirect("searching");

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 17]]);
}); //--------------------------------------Index--------------------------------------------------

app.get("/", function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          res.render("index");

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //---------------------------------Login Hopspital--------------------------------------------

app.get("/login_hospital", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          res.render("login_hospital", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.post("/login_hospital", function _callee6(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee6$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context10.sent;

          if (!chk) {
            _context10.next = 11;
            break;
          }

          _context10.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context10.sent;

          if (ismatch) {
            req.session.isAuth = true;
            req.session.loginhid = chk._id;
            res.redirect("hospitaldetails");
          } else {
            req.flash('msg', 'Wrong Password');
            res.redirect("login_hospital");
          }

          _context10.next = 13;
          break;

        case 11:
          req.flash('msg', 'Wrong Username');
          res.redirect("login_hospital");

        case 13:
          _context10.next = 19;
          break;

        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("login_hospital");

        case 19:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //---------------------------------------Home User------------------------------------------

app.get("/home", isAuth, function _callee7(req, res) {
  return regeneratorRuntime.async(function _callee7$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          res.render("home");

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //-------------------------------------Login User--------------------------------------------

app.get("/login_user", function _callee8(req, res) {
  return regeneratorRuntime.async(function _callee8$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          res.render("login_user", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.post("/login_user", function _callee9(req, res) {
  var chk, ismatch;
  return regeneratorRuntime.async(function _callee9$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(userinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context13.sent;

          if (!chk) {
            _context13.next = 11;
            break;
          }

          _context13.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, chk.password));

        case 7:
          ismatch = _context13.sent;

          if (ismatch) {
            req.session.loginuid = chk.id;
            console.log();
            req.session.isAuth = true;
            res.redirect("home");
          } else {
            req.flash('msg', 'Wrong Password');
            res.redirect("login_user");
          }

          _context13.next = 13;
          break;

        case 11:
          req.flash('msg', 'Wrong Username');
          res.redirect("login_user");

        case 13:
          _context13.next = 19;
          break;

        case 15:
          _context13.prev = 15;
          _context13.t0 = _context13["catch"](0);
          req.flash('msg', 'Enter Details');
          res.redirect("login_user");

        case 19:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); //--------------------------------About-Contact-explore---------------------------------------
//-----------------------------------Hospital Home--------------------------------------------

app.get("/hospitaldetails", isAuth, function _callee10(req, res) {
  return regeneratorRuntime.async(function _callee10$(_context14) {
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
}); //---------------------------------Sign up Hospital--------------------------------------------

app.get("/signup_hospital", function _callee11(req, res) {
  return regeneratorRuntime.async(function _callee11$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          res.render("signup_hospital", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.post("/signup_hospital", function _callee12(req, res) {
  var chk, hashpwd, cpass, newhospreg;
  return regeneratorRuntime.async(function _callee12$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(hospinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context16.sent;

          if (chk) {
            _context16.next = 22;
            break;
          }

          _context16.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 7:
          hashpwd = _context16.sent;
          _context16.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 10:
          cpass = _context16.sent;

          if (!cpass) {
            _context16.next = 18;
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
          _context16.next = 15;
          return regeneratorRuntime.awrap(hospinfo.insertMany([newhospreg]));

        case 15:
          res.redirect("login_hospital");
          _context16.next = 20;
          break;

        case 18:
          req.flash('msg', 'Re-enter password');
          res.redirect("Signup_hospital");

        case 20:
          _context16.next = 24;
          break;

        case 22:
          req.flash('msg', 'Already Registered');
          res.redirect("signup_hospital");

        case 24:
          _context16.next = 30;
          break;

        case 26:
          _context16.prev = 26;
          _context16.t0 = _context16["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("signup_hospital");

        case 30:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); //-------------------------------Sign Up User--------------------------------------------------

app.get("/signup_user", function _callee13(req, res) {
  return regeneratorRuntime.async(function _callee13$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          res.render("signup_user", {
            message: req.flash('msg')
          });

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app.post("/signup_user", function _callee14(req, res) {
  var chk, hashpwd, cpass, newuserreg;
  return regeneratorRuntime.async(function _callee14$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(userinfo.findOne({
            email: req.body.email
          }));

        case 3:
          chk = _context18.sent;

          if (chk) {
            _context18.next = 22;
            break;
          }

          _context18.next = 7;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 12));

        case 7:
          hashpwd = _context18.sent;
          _context18.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.confirmpassword, hashpwd));

        case 10:
          cpass = _context18.sent;

          if (!cpass) {
            _context18.next = 18;
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
          _context18.next = 15;
          return regeneratorRuntime.awrap(userinfo.insertMany([newuserreg]));

        case 15:
          res.redirect("login_user");
          _context18.next = 20;
          break;

        case 18:
          req.flash('msg', 'Re-enter Password');
          res.redirect("signup_user");

        case 20:
          _context18.next = 24;
          break;

        case 22:
          req.flash('msg', 'Already Registered');
          res.redirect("signup_user");

        case 24:
          _context18.next = 30;
          break;

        case 26:
          _context18.prev = 26;
          _context18.t0 = _context18["catch"](0);
          req.flash('msg', 'Enter Full details');
          res.redirect("signup_user");

        case 30:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 26]]);
}); //---------------------------------Equipment--------------------------------------------------

app.get("/equipments", isAuth, function _callee15(req, res) {
  return regeneratorRuntime.async(function _callee15$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
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
          return _context19.stop();
      }
    }
  });
});
app.post("/equipments", function _callee16(req, res) {
  var newequipmentreg;
  return regeneratorRuntime.async(function _callee16$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          newequipmentreg = new equipmentinfo({
            hospitalid: req.session.loginhid,
            instrumentname: req.body.instrumentname,
            type: req.body.type,
            availability: req.body.availability
          });
          _context20.next = 3;
          return regeneratorRuntime.awrap(equipmentinfo.insertMany([newequipmentreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("equipments");

        case 5:
        case "end":
          return _context20.stop();
      }
    }
  });
}); //---------------------------------IcuBeds---------------------------------------------------

app.get("/icubeds", isAuth, function _callee17(req, res) {
  return regeneratorRuntime.async(function _callee17$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
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
          return _context21.stop();
      }
    }
  });
});
app.post("/icubeds", function _callee18(req, res) {
  var newicubedreg;
  return regeneratorRuntime.async(function _callee18$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          newicubedreg = new icubedinfo({
            hospitalid: req.session.loginhid,
            cost: req.body.cost,
            beds: req.body.beds
          });
          _context22.next = 3;
          return regeneratorRuntime.awrap(icubedinfo.insertMany([newicubedreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("icubeds");

        case 5:
        case "end":
          return _context22.stop();
      }
    }
  });
}); //------------------------------Appointment-----------------------------------------------------

app.get("/appointments", isAuth, function _callee19(req, res) {
  return regeneratorRuntime.async(function _callee19$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
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
          return _context23.stop();
      }
    }
  });
});
app.post("/appointments", function _callee20(req, res) {
  var newappointmentreg;
  return regeneratorRuntime.async(function _callee20$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          newappointmentreg = new appointmentinfo({
            hospitalid: req.session.loginhid,
            doctor: req.body.doctor,
            specialist: req.body.specialist,
            cost: req.body.cost,
            yoe: req.body.yoe,
            bookingslot: req.body.bookingslot
          });
          _context24.next = 3;
          return regeneratorRuntime.awrap(appointmentinfo.insertMany([newappointmentreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("appointments");

        case 5:
        case "end":
          return _context24.stop();
      }
    }
  });
}); //-----------------------------------Beds--------------------------------------------------

app.get("/beds", isAuth, function _callee21(req, res) {
  return regeneratorRuntime.async(function _callee21$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
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
          return _context25.stop();
      }
    }
  });
});
app.post("/beds", function _callee22(req, res) {
  var newbedreg;
  return regeneratorRuntime.async(function _callee22$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          newbedreg = new bedinfo({
            hospitalid: req.session.loginhid,
            publicward: req.body.publicward,
            privateward: req.body.privateward,
            wards: req.body.ward,
            disease: req.body.disease
          });
          _context26.next = 3;
          return regeneratorRuntime.awrap(bedinfo.insertMany([newbedreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("beds");

        case 5:
        case "end":
          return _context26.stop();
      }
    }
  });
}); //----------------------------------Surgeries-----------------------------------------------

app.get("/surgeries", isAuth, function _callee23(req, res) {
  return regeneratorRuntime.async(function _callee23$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
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
          return _context27.stop();
      }
    }
  });
});
app.post("/surgeries", function _callee24(req, res) {
  var newsurgeryreg;
  return regeneratorRuntime.async(function _callee24$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          newsurgeryreg = new surgeryinfo({
            hospitalid: req.session.loginhid,
            doctor: req.body.doctor,
            specialist: req.body.specialist,
            cost: req.body.cost,
            yoe: req.body.yoe
          });
          _context28.next = 3;
          return regeneratorRuntime.awrap(surgeryinfo.insertMany([newsurgeryreg]));

        case 3:
          req.flash('msg', 'Successfully Registered');
          res.redirect("surgeries");

        case 5:
        case "end":
          return _context28.stop();
      }
    }
  });
}); //-------------------------------Logout Key--------------------------------------------------

app.post("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.redirect("/");
  });
}); //---------------------------------Hosting---------------------------------------------------

app.listen(port, hostname, function () {
  console.log("Server is Running!");
});