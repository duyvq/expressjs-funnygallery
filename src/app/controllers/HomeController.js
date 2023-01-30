const User = require('../models/User');
const Photos = require('../models/Photos');

class HomeController {
    async home(req, res) {
        const userToken = req.cookies.jwt;
        console.log('userToken: ', userToken)
        const foundUser = await User.findOne({ refreshToken: userToken });
        res.render('home', {
            user: foundUser?.username
        })
    }

    async all_picture(req, res) {
        const photos = await Photos.find().sort({ 'timestamps': -1 });
        console.log('Photo: ')
        res.json(photos)
    }
}

module.exports = new HomeController