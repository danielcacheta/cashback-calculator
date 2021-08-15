const Sequelize = require('sequelize')
const database = require('../config/db')

const Order = database.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  resellerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { model: 'resellers', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false
  },
  totalValue: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  state: {
    type: Sequelize.ENUM('Em validação', 'Aprovado'),
    allowNull: false
  }
})

module.exports = Order