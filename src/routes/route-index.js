const memeRouter = require('./route-meme')
const homeRouter = require('./route-home')
const registerRoute = require('./route-register')
const loginRoute = require('./route-login')
const logoutRoute = require('./route-logout')


function route(app) {
    app.use('/create', memeRouter)
    // app.post('/create', memeRouter)
    app.use('/register', registerRoute)
    app.use('/login', loginRoute)
    app.use('/logout', logoutRoute)
    app.use('/', homeRouter)
}

module.exports = route