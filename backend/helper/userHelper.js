const User = require("../model/userModel"); //user model

const bcrypt = require("bcrypt"); //for password hashing

const jwt = require("jsonwebtoken");

const { ObjectId} = require("mongodb");

//export userHelper to routes
module.exports = {
  login: (userCred) => {
    return new Promise(async (resolve, reject) => {
      User.findOne({ userEmail: userCred.userEmail }, (err, user) => {
        if (err || !user)
          reject({ loginStatus: false, message: "Username doesn't exist" });
        else
          bcrypt
            .compare(userCred.passKey, user.passKey)
            .then((isMatch) => {
              if (isMatch) {
                user.passKey = undefined;

                resolve(user);
              } else
                reject({
                  loginStatus: false,
                  message: "Username or password is invalid",
                });
            })
            .catch((err) =>
              reject({
                loginStatus: false,
                message: "Username or password is invalid",
              })
            );
      });
    });
  },

  signup: (userCreds) => {
    return new Promise(async (resolve, reject) => {
      bcrypt
        .hash(userCreds.passKey, 10)
        .then((hash) => {
          userCreds.passKey = hash;
          const user = new User(userCreds);
          user
            .save()
            .then((user) => {
              user.passKey = undefined;
              user.loginStatus = true;
              resolve(user);
            })
            .catch((err) =>
              reject({ loginStatus: false, message: "User already exist" })
            );
        })
        .catch((err) => console.log(err));
    });
  },

  isAuth: (req, res, next) => {
    // try {
      const token = req.header("Authorization").replace("Bearer ", "");

      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
        } else {
          console.log(decoded.tagId+"\n60f02bdfe5573915ce945ace");

          User.findOne({ _id:decoded.tagId }, (err, user) => {
            if (err || !user)
              res.status(401).send({ error: "Please authenticate." });
            else {
              req.token = token;
              req.user = user;
              next();
            }
          });
        }
      });
    // } catch (error) {
    //   res.status(401).send({ error: "Please authenticate." });
    // }
  },

  jwtSign: async (tagId, callback) => {
    const token = await jwt.sign({ tagId }, process.env.JWT_SECRET);
    callback(token);
  },
};
