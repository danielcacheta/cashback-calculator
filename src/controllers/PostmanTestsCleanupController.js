const Sequelize = require('sequelize')
const Reseller = require('../models/Reseller')

module.exports = {
  async cleanup(req, res) {
    const keyWord = 'PostmanTest'
    const Op = Sequelize.Op

    await Reseller.destroy({
      where:
      {
        'name': {
          [Op.like]: '%' + keyWord + '%'
        }
      }
    })

    const resellers = await Reseller.findAll({
      where:
      {
        'name': {
          [Op.like]: '%' + keyWord + '%'
        }
      }
    })

    if (resellers.length)
      return res.json({ result: 'Cleanup Failed!' })

    return res.json({ result: 'Cleanup Finished!' })
  }
}