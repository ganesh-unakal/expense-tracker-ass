const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense', 'root', 'Tiger4000',{
    dialect :'mysql',
    host: 'localhost'
})

module.exports = sequelize