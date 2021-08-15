const Order = require('../models/Order')
const cashbackCalculator = require('../helpers/cashbackCalculator')
const cpfHelper = require('../helpers/cpfHelper')
const resellerValidationHelper = require('../helpers/resellerValidationHelper')

module.exports = {
  async index(req, res) {
    let { resellerCpf } = req.params
    resellerCpf = cpfHelper.normalizeCpf(resellerCpf)

    const resellerValidation = await resellerValidationHelper.findResellerByCpf(resellerCpf)

    if (!resellerValidation.resellerExists)
      return res.status(404).json({ result: resellerValidation.errorMessage })

    const orders = await Order.findAll({
      attributes:['code', 'date', 'cpf', 'totalValue'],
      where:
        { 'resellerId': resellerValidation.resellerId }
    })

    const ordersWithCashback = []

    orders.forEach(order => {
      ordersWithCashback.push({
        'code': order.code,
        'date': order.date,
        'cpf': order.cpf,
        'totalValue': order.totalValue.toFixed(2),
        'cashbackPercentage': cashbackCalculator.getPercentage(order.totalValue),
        'cashbackValue': cashbackCalculator.calculateCashback(order.totalValue).toFixed(2)
      })
    })

    res.json(ordersWithCashback)
  },

  async store(req, res) {
    const { code, date, totalValue } = req.body
    let { resellerCpf } = req.params
    let { cpf } = req.body

    resellerCpf = cpfHelper.normalizeCpf(resellerCpf)
    cpf = cpfHelper.normalizeCpf(cpf)

    if (resellerCpf !== cpf)
      return res.status(422).json({ result: 'CPFs from Request Body and URL don\'t match' })

    const resellerValidation = await resellerValidationHelper.findResellerByCpf(cpf)

    if (!resellerValidation.resellerExists)
      return res.status(404).json({ result: resellerValidation.errorMessage })

    const state = resellerValidationHelper.getInitialOrderStateForReseller(cpf)

    const order = await Order.create({ 'resellerId': resellerValidation.resellerId, code, date, cpf, totalValue, state })

    return res.json(order)
  }
}