const jwt = require("jsonwebtoken");

const config = process.env;

const isTokenAvailable = (req)=>{
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies["x-access-token"];
  return token
}


const loginRequired = (req, res, next) => {
  let token = isTokenAvailable(req);

  if (!token) {
    // return res.status(403).send("A token is required for authentication");
    return res.status(403).redirect("/auth/login")
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    // return res.status(401).send("Invalid Token");
    return res.status(401).redirect("/auth/login")
  }
  return next();
};

const isUserLoggedIn = (req)=>{
  let tokenAvailable = isTokenAvailable(req)
  try {
    const decoded = jwt.verify(tokenAvailable, config.TOKEN_KEY);
    return true
  } catch (err) {
    return false
  }

}

module.exports = {
  loginRequired,
  isUserLoggedIn
};