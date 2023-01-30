const User = require('../models/User');
const Photos = require('../models/Photos');
const path = require('path');
const fs = require("fs");

class MemeController {
    async form(req, res) {
        // Requires user logged in, otherwise render home
        const userToken = req.cookies.jwt;
        const foundUser = await User.findOne({ refreshToken: userToken });
        if (!foundUser) return res.render('home')
        
        res.render('meme', {
            user: foundUser.username
        })
    }

    async upload_meme(req, res) {
        if (req.method != 'POST') return res.status(404).json({ message: 'Not found!' })
        const { fileName, photo, photoDescription } = req.body

        // Check for duplicate photo name in the db
        const duplicate = await Photos.findOne({ photoName: fileName }).exec();
        if (duplicate) return res.status(409).json({ message: 'Name exists. '});; // Conflict

        try {
            // Name for directory
            const newDate = new Date();
            const relativeImgDir = path.join('img', 
                `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDate()}`);
            const imgDir = path.join(__dirname, '..', '..', 'public', relativeImgDir);

            // Create a directory
            await fs.mkdir(imgDir, { recursive: true }, (err) => {
                if (err) throw err;
            });

            // Decode base64 to photo
            const relativePhotoPath = path.join(relativeImgDir, `${fileName.replace(/[^A-Z0-9]+/ig, "_")}.jpg`);
            const photoPath = path.join(imgDir, `${fileName.replace(/[^A-Z0-9]+/ig, "_")}.jpg`);
            
            await fs.writeFile(photoPath, photo, {encoding: 'base64'}, function(err) {
                console.log('File created');
            });

            // create and store new photo to DB
            const result = await Photos.create({
                "photoName": fileName,
                "photoPath": relativePhotoPath,
                "photoDescription": photoDescription
            });

            res.json({ message: 'File saved' })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new MemeController