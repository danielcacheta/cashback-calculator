const Reseller = require('../models/Reseller')
const cpfHelper = require('../helpers/cpfHelper')
const passwordHelper = require('../helpers/passwordHelper')
const resellerValidationHelper = require('../helpers/resellerValidationHelper')

module.exports = {
  async store(req, res) {
    const { name, email } = req.body
    let { cpf, password } = req.body

    cpf = cpfHelper.normalizeCpf(cpf)
    password = passwordHelper.encrypt(password)

    const resellerValidation = await resellerValidationHelper.validateReseller(cpf, email)

    if (resellerValidation.isDuplicate)
      return res.status(409).json({ result: resellerValidation.errorMessage })

    const reseller = await Reseller.create({ name, cpf, email, password })

    return res.json(reseller)
  }
}