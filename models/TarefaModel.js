const Sequelize = require('sequelize');
const conexao = require('./conexao');

const tarefa = conexao.define('tarefa',{

    titulo:{

        type: Sequelize.STRING,
        allowNUll: false
    },
    descricao:{

        type: Sequelize.STRING,
        allowNull: false
    },
    prioridade:{

        type: Sequelize.INTEGER,
        allowNUll:false
    },
    status:{

        type:Sequelize.INTEGER,
        allowNull:true,
        defaultValue: 1
    }

})

tarefa.sync({force:false}).then(()=>{

    console.log('Entidade Tarefas criada com sucesso!');
})

module.exports = tarefa