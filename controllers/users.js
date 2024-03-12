const { User } = require("../models");

exports.createUser = async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({ username, email, password });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log("###error", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found!");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("###error", error);
    res.status(500).send("Internal Server Error");
  }
};
