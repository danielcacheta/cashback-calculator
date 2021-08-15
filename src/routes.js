const express = require('express')
const AuthenticationController = require('./controllers/AuthenticationController')
const OrderController = require('./controllers/OrderController')
const PostmanTestsCleanupController = require('./controllers/PostmanTestsCleanupController')
const ResellerController = require('./controllers/ResellerController')

const routes = express.Router()

routes.get('/', (req, res) => res.json({ message: 'Server UP' }))

routes.post('/resellers', ResellerController.store)
routes.get('/resellers/:resellerCpf/orders', OrderController.index)
routes.post('/resellers/:resellerCpf/orders', OrderController.store)

routes.post('/login', AuthenticationController.login)

routes.get('/postmanTestsCleanup', PostmanTestsCleanupController.cleanup)

module.exports = routes