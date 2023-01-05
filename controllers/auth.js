const jwt = require("jsonwebtoken");

const User = require("../schema/user");

exports.wsRes = async (req, res, next) => {
  try {
    res.send("HI");
  } catch (err) {
    console.log(err);
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong !";
    }
  }
};

exports.register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const saveNewUser = await newUser.save((err, result) => {
      console.log(result._id);

      let payload = { subject: result._id };
      let newToken = jwt.sign(payload, "secretKey");

      res.status(200).json({
        message: "Success",
        token: newToken,
      });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong !";
    }
  }
};

exports.logIn = async (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (!user) {
        res.status(401).send("Email Not Found");
      } else if (user.password !== req.body.password) {
        res.status(401).send("Wrong Password !");
      } else {
        let payload = { subject: user._id };
        let newToken = jwt.sign(payload, "secretKey");

        res.status(200).json({
          message: "Success",
          token: newToken,
          name: user.name,
          id: user._id,
        });
      }
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = "Something went wrong !";
    }
  }
};
