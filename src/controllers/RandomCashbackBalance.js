module.exports = {
  async index(req, res) {
    
    if(!req.query.cpf)
    res.status(400).json({
      result: 'CPF is Required'
    })

    const max = 500
    const min = 10

    const randomValue = Math.random() * (max - min) + min

    res.json({
      'result': 200,
      'balance': randomValue.toFixed(2)
    })
  }
}