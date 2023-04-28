const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { encrypt, decrypt } = require("../helpers/crypto.js");
// const {logger} = require("../helpers/logger.js")

exports.signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.email = await encrypt(req.body.email);

    const user = await User.create(req.body);
    
    user.email = await decrypt(user.email);
    res.status(201).json(user);
  } catch (err) {
    // logger.error(err)
    return res.status(500).json({
      error: err.message || "Some error occurred while creating user.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const emailEncrypted = await encrypt(req.body.email);
    const user = await User.findOne({
      where: { email: emailEncrypted },
    });
    if (!user) {
      const err= {
        error: "User not found",
      }
      // logger.error(err)

      return res.status(404).json(err);
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const token = await jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: Number(process.env.JWTExpiration),
      });

      user.email = await decrypt(user.email);

      res.status(200).json({
        accessToken: token,
        user: user,
      });
    } else{
      throw new Error("Invalid password");
    }
  } catch (err) {
    // logger.error(err)
    res.status(500).json({
      error:
        err.message ||
        `Some error occurred while retrieving user with email "${req.body.email}"`,
    });
  }
};
