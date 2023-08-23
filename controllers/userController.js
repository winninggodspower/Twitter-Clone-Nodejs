const User = require("../models/user");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { isUserLoggedIn } = require("../middleware/auth");


const user_register_get = (req, res) => {
    res.render("register", { errorMessage: null })
}

const user_register_post = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstName && lastName)) {
            return res.status(400).render('register', { errorMessage: 'Invalid username or password' });
        }

        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).render('register' ,{ errorMessage: "User Already Exist. Please Login" });
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(), // sanitize
            password: encryptedUserPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email, first_name: user.first_name, last_name: user.last_name },
            process.env.TOKEN_KEY,
            { expiresIn: "5h" }
        );

        // save user token
        user.token = token;

        // save token in frontend cookies
        res.cookie(`x-access-token`, user.token);

        // return new user
        // res.status(201).json(user);
        res.status(201).redirect("/")

    } catch (error) {
        console.log(error);
    }
}

const user_login_get = (req, res) => {
    const userLoggedIn = isUserLoggedIn(req);
    // redirect user if user is already logged in
    if (userLoggedIn) {
        return res.redirect("/")
    }

    res.render("login", { errorMessage: null })
}

const user_login_post = async (req, res) => {
    const { email, password } = req.body;

    // validate user input
    if (!(email, password)) {
        res.status(400).render('login', { errorMessage: 'All input required' })
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email, first_name: user.first_name, last_name: user.last_name },
            process.env.TOKEN_KEY,
            { expiresIn: "5h",}
        );

        // save user token
        user.token = token;
        
        // save token in frontend cookies
        res.cookie(`x-access-token`, user.token);

        // user
        // return res.status(200).json(user);
        return res.status(200).redirect("/")
    }

    return res.status(400).render('login', { errorMessage: "Invalid Credentials " });
}

const user_logout_get = (req, res)=>{
    // clear x-access-token cookie 
    res.clearCookie(`x-access-token`)

    res.redirect("/auth/login")
}

module.exports = {
    user_login_post, 
    user_register_get,
    user_register_post,
    user_login_get,
    user_logout_get,
}