var express = require("express");
var router = express.Router();
const userHelper = require("../helper/userHelper");
const jwt = require("jsonwebtoken");

const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//middleware
const isLoggedin = (req, res, next) => {
  if (req.session.user) next();
  else res.json({ message: "Please log in to access this" });
};


// const isAuth = (req, res, next) => {
//   console.log(req.body);
//   console.log(req.sessionID);
//   console.log(req.session);
//   if (req.body.token == req.sessionID) next();
//   else res.json({ message: "Please log in to access this" });
// };

//Routes

router.post("/login", cors(corsOptions), (req, res) => {
  const data = req.body;
  if (!data.passKey || !data.userEmail) return res.status(401).json(err);

  userHelper
    .login(req.body)
    .then((user) => {
      userHelper.jwtSign(user._id, (token) => {
        res.json({loginStatus:true,token})
      });

      // res.json({ loginStatus: true });
    })
    .catch((err) => res.status(401).json(err));
});

router.post("/signup", cors(), (req, res) => {
  userHelper
    .signup(req.body)
    .then((user) => {
      try {
        let token = jwt.sign(user._id, process.env.JWT_SECRET);
        res.cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          maxAge: 3600000,
        });
        // res.json({message: "Lo"});
        console.log("Login Successful");
      } catch (error) {
        res.status(400).send();
      }
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/puppy", cors(), userHelper.isAuth, (req, res) => {
  res.json({ message: "This is a message" });
});
router.get("/puppy", cors(), userHelper.isAuth, (req, res) => {
  console.log("Cookies: ", req.cookies);
  try {
    res.render("me", { name: user.name });
  } catch (error) {
    res.status(500).send();
  }

  res.json({ message: "This is a message" });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logout Successful" });
});

router.get("/test", isLoggedin, (req, res) => {
  console.log(req.session);
  res.json({ message: "The test area number 51" });
});

router.get("/test2", (req, res) => {
  res.json({ message: "The test area number 52" });
});

module.exports = router;

/*
//Password hashing
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        newUser.password = hash;
        // Save user
        newUser
          .save()
          .then(
            res.json({
              msg: "Successfully Registered"
            })
          )
          .catch((err) => console.log(err));
      })
    );
*/
