const User = require('../models/User');
const bcrypt = require('bcrypt');
const loginController = require('./LoginController')

class RegisterController {
    async register(req, res) {
        const { username, email, password, confirmation } = req.body;
        if (!username || !password) return res.status(400).json({ message: 'Username and password are required. '});
        
        // Check for duplicate usernames in the db
        const duplicate = await User.findOne({ username: username }).exec();
        if (duplicate) return res.status(409).json({ message: 'Username exists. '});; // Conflict

        if (password !== confirmation) return res.status(400).json({ message: 'Password and confirmation must match.'})
        
        try {
            // encrypt the pwd
            const hashedPwd = await bcrypt.hash(password, 10);

            // create and store new user
            const result = await User.create({
                "username": username,
                "password": hashedPwd,
                "email": email
            });
            
                console.log(result);

            // If user is created successfully, log user in
            await loginController.handleLogin(req, res)

            // res.status(201).json({ message: `New user ${username} created!` })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
}

module.exports = new RegisterController