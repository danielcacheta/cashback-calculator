const Reseller = require('../models/Reseller')
const passwordHelper = require('../helpers/passwordHelper')

module.exports = {
  async login(req, res){
    const {email, password} = req.body
    
    const reseller = await Reseller.findAll({where:{email}})

    if(!reseller.length || !passwordHelper.isValid(password, reseller[0].password))
      return res.status(401).json({result: 'Unauthorized'})

    return res.json({result:'User Authenticated'})
  }
}