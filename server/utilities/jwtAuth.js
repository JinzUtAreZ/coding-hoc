const expressJwt = require("express-jwt");
// NOTE: exclude other pages when user is not admin
function jwtAuth() {
  const secret = process.env.SECRET_KEY;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [`${api}/users/login`, `${api}/users/new`, `${api}/users/renewToken`],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = jwtAuth;
