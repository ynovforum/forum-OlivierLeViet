const router = require('express').Router();
const website = require('./website');
const admin = require('./admin');
const user = require('./user');


function isAuthenticated(req, res, next) {
    if (req.user && req.user.role === 'Admin') {
        return next();
    }

    return res.redirect('admin');
}

function userIsAuthenticated(req, res, next) {
    if (req.user && req.user.role === 'User'){
        return next();
    }

    return res.redirect('/');
}

router.use('/', website);
router.use('/admin', isAuthenticated,  admin);
router.use('/user', userIsAuthenticated, user);

module.exports = router;