var express = require('express');
var router = express.Router();
var { post_index, post_create } = require('../controllers/postController')
const {loginRequired, isUserLoggedIn} = require("../middleware/auth");

/* GET home page. */
router.get('/', loginRequired, post_index);

router.post('/post_create',loginRequired, post_create)

module.exports = router;
