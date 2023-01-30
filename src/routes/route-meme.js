const express = require('express')
const memeController = require('../app/controllers/MemeController')
const router = express.Router()

router.post('/upload_meme', memeController.upload_meme)
router.get('/', memeController.form)

module.exports = router