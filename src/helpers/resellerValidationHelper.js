const Reseller = require('../models/Reseller')
const autoApprovedCpfs = require('./autoApprovedCpfs.json').autoApprovedCpfs

const resellerValidationHelper = {
  async validateReseller(cpf, email) {
    const existingCpf = await Reseller.findAll({ where: { cpf } })
    const existingEmail = await Reseller.findAll({ where: { email } })

    const cpfAlreadyExists = existingCpf.length > 0
    const emailAlreadyExists = existingEmail.length > 0

    return {
      isDuplicate: cpfAlreadyExists || emailAlreadyExists,
      errorMessage: duplicateRecordMessage.getMessage(cpfAlreadyExists, emailAlreadyExists)
    }
  },

  async findResellerByCpf(cpf) {
    const reseller = await Reseller.findAll({ where: { cpf } })

    const resellerExists = reseller.length > 0

    return {
      resellerExists,
      resellerId: resellerExists ? reseller[0].id : 0,
      errorMessage: recordNotFoundMessage.getMessage(resellerExists)
    }
  },

  getInitialOrderStateForReseller(cpf) {
    return autoApprovedCpfs.includes(cpf) ?
      'Aprovado' :
      'Em Validação'
  }
}

const duplicateRecordMessage = {
  getMessage: function (cpfAlreadyExists, emailAlreadyExists) {
    let validationMessage = ""

    if (cpfAlreadyExists)
      validationMessage = "The CPF informed already exists"
    else if (emailAlreadyExists)
      validationMessage = "The e-mail informed already exists"

    return validationMessage
  }
}

const recordNotFoundMessage = {
  getMessage: function (resellerExists) {
    let validationMessage = ""

    if (!resellerExists)
      validationMessage = "The CPF informed does not belong to a registered Reseller"

    return validationMessage
  }
}

module.exports = resellerValidationHelper