const express = require('express');
const path = require('path');
const conexao = require('./models/conexao')
const TarefaModel = require('./models/TarefaModel')
const tarefaController = require('./controllers/tarefaController')
const app = express()

conexao.authenticate().then(() => {

    console.log('Conectado ao banco Tarefas')

})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

app.use(tarefaController)

app.get('/', (req, res) => {

    TarefaModel.findAll().then((tarefas) => {

        res.render('index.ejs', { tarefas });

    }).catch(err => {

        res.render('error500')
    })

})


app.listen(3000, () => {

    console.log('http://localhost:3000');

})