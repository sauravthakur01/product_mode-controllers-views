const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','sp.191273',{
    dialect:'mysql' ,
    host:'localhost',
})

module.exports = sequelize ;