const Order = require('../models/Order')
const cpfHelper = require('../helpers/cpfHelper')
const resellerValidationHelper = require('../helpers/resellerValidationHelper')

module.exports = {
  async store(req, res) {
    const { code, date, totalValue } = req.body
    let { resellerCpf } = req.params
    let { cpf } = req.body

    resellerCpf = cpfHelper.normalizeCpf(resellerCpf)
    cpf = cpfHelper.normalizeCpf(cpf)

    if(resellerCpf !== cpf)
      return res.status(422).json({ result: 'CPFs from Request Body and URL don\'t match' })

    const resellerValidation = await resellerValidationHelper.findResellerByCpf(cpf)

    if (!resellerValidation.resellerExists)
      return res.status(404).json({ result: resellerValidation.errorMessage })

    const state = resellerValidationHelper.getInitialOrderStateForReseller(cpf)

    const order = await Order.create({ 'resellerId': resellerValidation.resellerId, code, date, cpf, totalValue, state })

    return res.json(order)
  }
}