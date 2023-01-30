const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {
    async handleLogin (req, res) {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

        const foundUser = await User.findOne({ username: username }).exec();
        if (!foundUser) return res.status(401).json({ message: 'Invalid username and/or password.' }); //Unauthorized 
        // evaluate password 
        const match = await bcrypt.compare(password, foundUser.password);
        if (match) {
            // create JWTs
            const accessToken = jwt.sign(
                {"username": foundUser.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            const refreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            // Send authorization roles and access token to user
            res.json({ 'message': 'Login successfully.',
                status: '201',
                // user: foundUser.username ,
                // refreshToken: refreshToken
            })

        } else {
            res.status(401).json({ message: err.message });
        }
    }
}

module.exports = new LoginController;