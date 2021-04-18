const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const authorizeRole = require("../utilities/jwtAuthRole");

//IMPORTANT: ADMIN = true
// NOTE: GET ALL USERS //
router.get("/", authorizeRole("creator"), async (req, res) => {
  const userList = await User.find(); //.select(-password);

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

// NOTE: ADD NEW USER //
router.post("/new", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();

    const { token, refreshToken } = await user.generateAuthToken();
    //console.log("access - ", token, "refresh - ", refreshToken);
    res.status(201).send({ token, refreshToken }); //TODO: Created
  } catch (err) {
    res.status(400).send("Error in creating new user"); //TODO: Bad Request
  }
});

//IMPORTANT: ADMIN = false
// NOTE: FIND ONE USER //

router.get("/:id", authorizeRole("superadmin", "viewer"), async (req, res) => {
  //TODO: particular fields only (name email isAdmin)
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404).send({ message: "The user was not found" });
  }
  res.status(200).send(user);
});

// NOTE: LOGIN USER //
router.post("/login", async (req, res) => {
  try {
    //console.log(req.body.email, req.body.password);

    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // TODO: middleware is already throwing error no need to check user value
    // catch block will fire if error is thrown
    const { token, refreshToken } = await user.generateAuthToken();

    res.status(200).send({ token, refreshToken });
  } catch (err) {
    res.status(404).send(err);
  }
});

// NOTE: DELETE ONE USER
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

// NOTE: VERIFY REFRESH TOKEN
router.post("/renewToken", async (req, res) => {
  const renewToken = req.body.token;
  if (renewToken == null) return res.status(401).send("User token error"); // TODO: Unauthorized
  //console.log("refresh", renewToken);
  const user = new User();

  try {
    const userDetails = await user.verifyToken(renewToken);

    const userFind = await User.findById(userDetails.userId).select(
      "-password"
    );
    //console.log(userFind);

    /// IMPORTANT: ALWAYS insert before deleting, cannot interchange
    const { token, refreshToken } = await userFind.generateAuthToken();

    // NOTE: DELETE RENEWTOKEN BY SEARCHING ID

    const tokenDelete = await User.findOneAndUpdate(
      { _id: userFind._id },
      { $pull: { tokens: { token: renewToken } } },
      { multi: true }
    );
    //console.log(tokenDelete);
    res.status(201).send({ tokenDelete, token, refreshToken }); //TODO: Created
  } catch (err) {
    res.status(403).send({ message: "Invalid user token" });
  }

  // NOTE: DELETE RENEWTOKEN DIRECTLY
  // await User.update(
  //   {},
  //   { $pull: { tokens: { token: renewToken } } },
  //   { multi: true }
  // );
});

// NOTE: LOGOUT USER PER TOKEN

router.post("/logout/:token", async (req, res) => {
  const token = req.params.token;
  if (token === null)
    return res.status("401").send({ message: "User token error" });

  const user = new User();
  try {
    const userDetails = await user.verifyToken(token);
    const userFind = userDetails
      .findById(userDetails.userId)
      .select("-password");

    if (!userFind) {
      return res.status(404).send({ message: "User not found" });
    }

    const tokenDelete = await User.findOneAndUpdate(
      { _id: userFind._id },
      { $pull: { tokens: { token: renewToken } } },
      { multi: true }
    );

    return res.status(200).send({ message: "User has been logged out" });
  } catch (err) {
    return res.status(403).send({ message: "User logout error" });
  }

  //const user = await User.findOneAndDelete({ _id: req.params.id });
});

// NOTE: LOGOUT USER ALL TOKEN
// FIX: Logout all user tokens for all devices
router.post("/logout/all/:token"),
  async (req, res) => {
    const token = req.params.token;
  };

module.exports = router;
