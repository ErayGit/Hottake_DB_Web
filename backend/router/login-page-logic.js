const express = require('express');
const userRouter = require('./user-router');

const router = express.Router();

// Login page route
router.get('/login', (req, res) => {
    res.render('login');
});

// login form
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // login logic holen von userRouter
    const loginResult = userRouter.login(username, password);

    if (loginResult.success) {
        // redirect zum user dashboard bei success
        res.redirect('/dashboard');
    } else {
        // error
        res.render('login', { error: loginResult.message });
    }
});

module.exports = router;