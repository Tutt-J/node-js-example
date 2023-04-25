const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    req.body.password=await bcrypt.hash(req.body.password, 10);
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch(err) {
    return res.status(500).json({
      message: err.message || "Some error occurred while creating user.",
    });
  }
};

exports.login = async (req, res) => {
  try{
    const user = await User.findOne({
        where: {email: req.body.email},
    })
    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if(match) {
        const token = await jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {
            expiresIn: Number(process.env.JWTExpiration)
        });

        res.status(200).json({
            accessToken: token,
            user: user
        })
    }
  } catch(err){
    res.status(500).json({
        message:
            err.message || `Some error occurred while retrieving user with email "${req.body.email}"`
    });
  }
};
