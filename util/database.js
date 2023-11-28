const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense_fulls', 'root', 'Tiger4000',{
    dialect :'mysql',
    host: 'localhost'
})

module.exports = sequelize