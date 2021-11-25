const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    !user && res.status(400).json("Wrong Credentials!");

    if (user) {
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("Wrong Credentials!");

      if (validated) {
        const { password, ...other } = user._doc;
        res.status(200).json(other);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
