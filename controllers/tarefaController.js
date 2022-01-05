const express = require('express')
const router = express.Router()
const TarefaModel = require('../models/TarefaModel')


router.get('/novaTarefa', (req, res) => {

    res.render('novaTarefa')

})

router.post('/salvaTarefa', (req, res) => {

    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    let prioridade = parseInt(req.body.prioridade);

    if (titulo && titulo.length != 0) {

        if (descricao && descricao.length != 0) {

            if (prioridade && prioridade >= 1 && prioridade <= 3) {

                TarefaModel.create({

                    titulo: titulo,
                    descricao: descricao,
                    prioridade: prioridade

                }).then(() => {

                    res.redirect('/')

                })
            } else {

                console.log(prioridade)
                res.redirect('/novaTarefa')
            }
        } else {
            console.log(descricao)

            res.redirect('/novaTarefa')
        }

    } else {
        console.log(titulo)

        res.redirect('/novaTarefa')
    }

})

router.get('/editarTarefa/:id', (req, res) => {

    let id = req.params.id;

    TarefaModel.findOne({

        where: {

            id: id
        }

    }).then(tarefa => {

        let titulo = tarefa.titulo;
        let descricao = tarefa.descricao;
        let prioridade = tarefa.prioridade;
        let status = tarefa.status;


        res.render('editarTarefa.ejs', { id, titulo, descricao, prioridade, status });

    }).catch(err => {

        res.render('error404');
    })


});

router.post('/atualizarTarefa', (req, res) => {

    let id = req.body.id
    let titulo = req.body.titulo;
    let descricao = req.body.descricao
    let prioridade = req.body.prioridade;
    let status = req.body.status;


    TarefaModel.update({ titulo, descricao, prioridade, status }, {

        where: {

            id: id
        }
    }).then(() => {

        res.redirect('/')

    }).catch(err => {

        res.redirect('/')
    })

});

router.post('/concluir', (req, res) => {

    let status = req.body.status;
    let id = req.body.id;

    TarefaModel.update({ status }, {

        where: {

            id: id
        }
    }).then(() => {

        res.redirect('/');

    })

});

router.post('/deletaTarefa', (req, res) => {

    let id = req.body.id

    TarefaModel.destroy({

        where: {

            id: id
        }
    }).then(() => {

        res.redirect('/');

    }).catch(err => {

        res.redirect('/');
    })
})

module.exports = router;