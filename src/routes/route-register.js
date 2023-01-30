const express = require('express')
const registerController = require('../app/controllers/RegisterController')
const router = express.Router()

router.use('/', registerController.register)

module.exports = router