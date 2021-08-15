const Reseller = require('../models/Reseller')

const resellerValidationHelper = {
  async validateReseller(cpf, email) {
    const existingCpf = await Reseller.findAll({ where: { cpf } })
    const existingEmail = await Reseller.findAll({ where: { email } })

    const cpfAlreadyExists = existingCpf.length > 0
    const emailAlreadyExists = existingEmail.length > 0

    return {
      isDuplicate: cpfAlreadyExists || emailAlreadyExists,
      errorMessage: validationMessage.getMessage(cpfAlreadyExists, emailAlreadyExists)
    }
  }
}

const validationMessage = {
  getMessage: function (cpfAlreadyExists, emailAlreadyExists) {
    let validationMessage = ""

    if (cpfAlreadyExists)
      validationMessage = "The CPF informed already exists"
    else if (emailAlreadyExists)
      validationMessage = "The e-mail informed already exists"

    return validationMessage
  }
}

module.exports = resellerValidationHelper