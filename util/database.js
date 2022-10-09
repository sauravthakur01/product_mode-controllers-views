const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete','root','saurav',{
    dialect:'mysql' ,
    host:'localhost',
})

module.exports = sequelize ;