const cpfHelper = require('../helpers/cpfHelper')
const request = require('request')
const resellerValidationHelper = require('../helpers/resellerValidationHelper')

module.exports = {
  async index(req, res) {
    const endpoint = 'http://localhost:3000/randomCashbackBalance?cpf='

    let { resellerCpf } = req.params
    resellerCpf = cpfHelper.normalizeCpf(resellerCpf)

    const resellerValidation = await resellerValidationHelper.findResellerByCpf(resellerCpf)

    if (!resellerValidation.resellerExists)
      return res.status(404).json({ result: resellerValidation.errorMessage })

    request({
      uri: endpoint + resellerCpf,
      method: 'GET'
    }, function (err, result){
      if(err)
        res.status(400).json({error: err})

      if(result.statusCode !== 200)
        res.status(result.statusCode).json({error: err, result})

      const parsedResult = JSON.parse(result.body)
      
      res.json({'cashbackBalance': Number(parsedResult.balance).toFixed(2)})
    })
  }
}