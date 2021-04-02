const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET ALL USERS //
router.get("/", async (req, res) => {
  const userList = await User.find(); //.select(-password);

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// ADD NEW USER //
router.post("/new", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token }); //TODO: Created
  } catch (err) {
    res.status(400).send("Error in creating new user"); //TODO: Bad Request
  }
});

// FIND ONE USER //

router.get("/:id", async (req, res) => {
  //TODO: particular fields only (name email isAdmin)
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.send(500).json({ message: "The user was not found" });
  }
  res.status(200).send(user);
});

// LOGIN USER //
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //TODO: middleware is already throwing error no need to check user value
    // catch block will fire if error is thrown
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(404).send(err);
  }
});

// DELETE ONE USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      res.send(404).send("User is not deleted");
    }

    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// LOGOUT USER
router.post("/logout", async (req, res) => {});

module.exports = router;
