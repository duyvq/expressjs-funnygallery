const express = require('express')
const logoutController = require('../app/controllers/LogoutController')
const router = express.Router()

router.use('/', logoutController.handleLogout)


module.exports = router