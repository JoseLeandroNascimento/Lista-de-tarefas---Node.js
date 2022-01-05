const Sequelize = require('sequelize')


const conexao = new Sequelize('tarefas','root','',{

    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conexao;