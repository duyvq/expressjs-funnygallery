const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LogoutController {
    async handleLogout (req, res) {
        res.clearCookie('jwt');
        res.redirect('/')
    }
}

module.exports = new LogoutController;