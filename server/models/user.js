const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlphanumeric(value, "pl-PL")) {
        throw new Error("Name cannot contain special characters.");
      }
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  adminType: {
    type: String, // 0 = Viewer, 1 = Content Creator, 2 = All Access
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  tokens: [
    // NOTE: refreshtokens
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// IMPORTANT: use methods for manipulating data for an instance
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const secret = process.env.SECRET_KEY;
  const refresh = process.env.REFRESH_KEY;
  //console.log("methods", secret, refresh);
  //const token = jwt.sign({ id: user.id.toString() }, secret);

  const token = jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    secret,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    refresh,
    { expiresIn: "1d" }
  );

  //const userCreate = user;
  //console.log("methods", token, refreshToken);

  user.tokens = user.tokens.concat({ token: refreshToken });
  await user.save();
  return { token, refreshToken };
};

// NOTE: REFRESH TOKEN CHECKER

userSchema.methods.verifyToken = function (token) {
  const userDetails = jwt.verify(
    token,
    process.env.REFRESH_KEY,
    (err, user) => {
      if (err) throw new Error("Forbidden user access");
      if (!user) throw new Error("Invalid user token");
      return user;
    }
  );
  //console.log("token", userDetails);
  return userDetails;
};

// IMPORTANT: use statics for querying in the documents
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  //console.log("FindCredential", isMatch);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

// TODO: convert ._id to id
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", { virtuals: true });

// TODO: middle ware to Hash password before saving or updating ///
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hashSync(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
