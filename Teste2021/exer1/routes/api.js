var express = require('express');
var router = express.Router();


var Casamento = require('../controller/casamento')

/* GET users listing. */
/*GET /api/casamentos?nome=X - Devolve apenas uma lista com os 
casamentos onde o nome X aparece incluído no título;*/
router.get('/casamentos', function(req, res, next) {
    if(req.query.nome){
        Casamento.filtraNome(req.query.nome)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.ano){
        Casamento.filtraAno(req.query.ano)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }
    else if(req.query.ByAno){
        Casamento.filtraByAno(req.query.ByAno)
            .then(dados => res.jsonp(dados))
            .catch(erro => res.status(500).jsonp(erro))
    }else 
    Casamento.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
});



router.get('/casamentos/noivos' , function(req, res) {
    Casamento.listar()
        .then(dados => 

            res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro))
});

/* GET /api/casamentos/:id - Devolve a informação completa de uma publicação; */
router.get('/casamentos/:id' , function(req, res) {
    Casamento.noivos(req.params.id)
       .then(dados => {
        var pal = dados.title.split(':');
        console.log(pal)
        var noivo = pal[1].split('c.c.');
        console.log(noivo)
        res.jsonp(dados)
       })
         
       .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
