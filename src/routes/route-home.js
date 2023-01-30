const express = require('express')
const homeController = require('../app/controllers/HomeController')
const router = express.Router()

router.use('/all_picture', homeController.all_picture)
router.use('/', homeController.home)

module.exports = router