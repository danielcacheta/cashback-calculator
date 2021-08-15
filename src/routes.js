const express = require('express')
const cashbackCalculator = require('./cashbackCalculator')
const AuthenticationController = require('./controllers/AuthenticationController')
const ResellerController = require('./controllers/ResellerController')

const routes = express.Router()

routes.get('/', (req, res) => res.json({ message: 'Server UP' }))

routes.get('/calculateCashback/:totalValue', (req, res) => {
  const totalValue = parseInt(req.params.totalValue);
  res.json(
    {
      cashbackValue: cashbackCalculator.calculateCashback(totalValue),
      cashbackPercentage: cashbackCalculator.getPercentage(totalValue)
    })
})

routes.post('/resellers', ResellerController.store)
routes.post('/login', AuthenticationController.login)

module.exports = routes