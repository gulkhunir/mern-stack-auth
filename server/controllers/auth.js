const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await AuthSchema.findOne({email});

    if (user) {
      return res.status(500).json({ msg: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ msg: "Password must not be less than 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    if (!isEmail(email)) {
      return res.status(500).json({ msg: "Wrong email format" });
    }

    const newUser = await AuthSchema.create({username, email, password:passwordHash});

    const token = await jwt.sign(
      {
        id: newUser._id,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(201).json({ status: "OK", newUser, token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne({email});

    if (!user) {
      return res.status(500).json({ msg: "User not found" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ msg: "Wrong password" });
    }

    const token = await jwt.sign(
      {
        id: user._id,
      },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.status(200).json({ status: 'OK', user, token });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

function isEmail(emailAdress) {
  let regex =
    /^([a-zA-Z0-9_\-\.'’]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (emailAdress.match(regex)) return true;
  else {
    return false;
  }
}

module.exports = { login, register };
