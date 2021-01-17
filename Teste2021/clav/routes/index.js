var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get('http://clav-api.di.uminho.pt/v2/tipologias?apikey=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWNkNmMyZGUzODcyMzBmYmY0ZjE5MCIsImlhdCI6MTYwOTk3MDA4MywiZXhwIjoxNjEyNTYyMDgzfQ.Fpy6EnnlafgrovpjMUQtg0slcQw6chitUwhATkXbTGaxHoVuds1RPSqRhWaSjm0dmQYy3U1my-wgXY6THn6iiUyFRWl1lgkw4OW5n6fIvvhpfjNslt0OJp4J0xKJxgdbLcA9W-mpQBR1bre7LWdCMKBoFgCXxmk16TsYtJH7XVZD0CJ7Z8RD4OYYdYN5Ml6qXWfPUbeGxDjvg5O6sEM-lCAUGwpiqO0evWgcZtQgnou5zTTotBtTVuE5P52ohr8fVd14NzIIeG5v_HSNAMRAn0JU5r9to_nGiMxH1uW-cpGNbeprld1oIB0MxOGUEWSDTdUJGqkfBAX8wRoPA2aw0g')
    .then(dados => {
      res.render('index', { lista: dados.data })
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});


router.get('/tipologia/:id', function(req, res, next) {
  console.log("hello1")
  axios.get('http://clav-api.dglab.gov.pt/v2/tipologias/'+ req.params.id +'?info=completa&apikey=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWNkNmMyZGUzODcyMzBmYmY0ZjE5MCIsImlhdCI6MTYwOTk3MDA4MywiZXhwIjoxNjEyNTYyMDgzfQ.Fpy6EnnlafgrovpjMUQtg0slcQw6chitUwhATkXbTGaxHoVuds1RPSqRhWaSjm0dmQYy3U1my-wgXY6THn6iiUyFRWl1lgkw4OW5n6fIvvhpfjNslt0OJp4J0xKJxgdbLcA9W-mpQBR1bre7LWdCMKBoFgCXxmk16TsYtJH7XVZD0CJ7Z8RD4OYYdYN5Ml6qXWfPUbeGxDjvg5O6sEM-lCAUGwpiqO0evWgcZtQgnou5zTTotBtTVuE5P52ohr8fVd14NzIIeG5v_HSNAMRAn0JU5r9to_nGiMxH1uW-cpGNbeprld1oIB0MxOGUEWSDTdUJGqkfBAX8wRoPA2aw0g')
    .then(dados => {
      console.log("hello")
      axios.get('http://clav-api.dglab.gov.pt/v2/tipologias/'+ req.params.id +'/elementos?info=completa&apikey=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWNkNmMyZGUzODcyMzBmYmY0ZjE5MCIsImlhdCI6MTYwOTk3MDA4MywiZXhwIjoxNjEyNTYyMDgzfQ.Fpy6EnnlafgrovpjMUQtg0slcQw6chitUwhATkXbTGaxHoVuds1RPSqRhWaSjm0dmQYy3U1my-wgXY6THn6iiUyFRWl1lgkw4OW5n6fIvvhpfjNslt0OJp4J0xKJxgdbLcA9W-mpQBR1bre7LWdCMKBoFgCXxmk16TsYtJH7XVZD0CJ7Z8RD4OYYdYN5Ml6qXWfPUbeGxDjvg5O6sEM-lCAUGwpiqO0evWgcZtQgnou5zTTotBtTVuE5P52ohr8fVd14NzIIeG5v_HSNAMRAn0JU5r9to_nGiMxH1uW-cpGNbeprld1oIB0MxOGUEWSDTdUJGqkfBAX8wRoPA2aw0g')
        .then(entidades => {
          res.render('info-tipologia', { lista: dados.data, ents: entidades.data })
        })
        .catch(erro => {
          res.render('error',{error: erro})
        })
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});

router.get('/entidades/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/v2/entidade/'+ req.params.id +'?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ')
    .then(dados => {
      res.render('info-entidade', { lista: dados.data})
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});

module.exports = router;
