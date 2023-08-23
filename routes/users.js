const express = require('express');
const router = express.Router();
const { user_register_post, user_login_post, user_register_get, user_login_get, user_logout_get } = require("../controllers/userController")

const {loginRequired, isUserLoggedIn} = require("../middleware/auth");

router.get("/welcome", loginRequired, (req, res) => {
  res.status(200).send("Welcome to FreeCodeCamp 🙌");
});

router.get("/register", user_register_get)

router.get("/login", user_login_get)

// register route
router.post("/register", user_register_post)

// login route
router.post("/login", user_login_post);

// logout route
router.get("/logout", user_logout_get)

module.exports = router;
