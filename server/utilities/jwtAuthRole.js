const jwt = require("express-jwt");
const User = require("../models/user");

function authorizeRole(...authRoles) {
  const secret = process.env.SECRET_KEY;
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  let roles;
  if (typeof authRoles === "string") {
    roles = [...authRoles];
  } else {
    roles = [...authRoles];
  }
  console.log(roles);

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret, algorithms: ["HS256"] }),

    // authorize based on user role
    async (req, res, next) => {
      const user = await User.findById(req.user.userId).select("adminType");
      //console.log("auth by role", roles.length, user.adminType.toLowerCase());
      if (roles.includes(user.adminType.toLowerCase())) {
        console.log("passed auth by role", user, roles);
        // authentication and authorization successful
        next();
      } else {
        next(new Error("Auth Role"));
        return;
      }
    },
  ];
}

module.exports = authorizeRole;
