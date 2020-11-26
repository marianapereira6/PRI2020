var express = require('express');
var router = express.Router();
const axios = require('axios')
var Aluno = require('../controller/alunos');
const { collection } = require('../models/alunos');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
});

router.get('/alunos', (req,res)=> {
  Aluno.listar()
    .then(dados => res.render('alunos',{lista: dados}))
    .catch(e => res.render('error',{error: e}))
  
})

router.get('/alunos/:Numero', (req,res) =>{
  Aluno.consultar(req.params.Numero)
    .then(dado => res.render('aluno',{dado}))
    .catch(e => res.render('error',{error: e}))
  })

  // GET da página de adição de aluno
router.get('/registar', function (req, res) {
  res.render('registar')
})

  // GET da página de adição de aluno
 router.get('/alunos/update/:Numero', (req, res) => {
    Aluno.consultar(req.params.Numero)
      .then(dados => res.render('editar',{dados}))
      .catch(e => res.render('error',{error: e}))
 })

router.post('/registar', (req,res) => {
  const alu = {
    Número : req.body.Número,
    Nome: req.body.Nome,
    Git: req.body.Git
  }
  Aluno.inserir(alu)
    .then(dados => res.redirect("/alunos"))
    .catch(e => res.render('error',{error: e}))
  
})


// DELETE de um aluno
router.delete("/alunos/:_id", function (req, res) {
  Aluno.eliminar(req.params._id)
      .then(dados => {
          console.log("Aluno eliminado com sucesso...")
          res.sendStatus(200)
      })
      .catch(e => res.render('error',{error: e}))
      
})


// PUT de um alunos atualizado
router.put("/alunos/:Numero", function (req, res) {
  Aluno.atualizar(req.params.Número, req.body)
      .then(dados => {
          console.log("Aluno atualizado com sucesso...")
          res.sendStatus(200)
      })
      .catch(err => {
          console.log(err)
          res.status(400).render('error', { error: err })
      })
})

module.exports = router;
