var express = require('express');
var router = express.Router();
var axios = require('axios')


/* GET home page. */
router.get('/', function(req, res, next) {

  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4MzM4NiwiZXhwIjoxNjExMDEyMTg2fQ.bnITdHpJwJxixlIToH5d-PJLbu3fdj_-zRPpvsGAnS49LrRBHYG8-Aabsg8qinor1KyaRDeQgscCaKCt-JwycmHM8VQD5Z2ypxlNPE6U67-_LU34S5cXez0seOO7KLeXcJJZFoz3zl8rU_TFX45CNPRfAYSjI2_OLqZfRNJbasJZ35-Jiz9mH8VBzofOGSRlgtDId2O8htlgkR2dsMOxzbRSrh5fQYoMEFvbP-YKIiLcyin6ao_k4nSYNEOzyg2L3DRjoE5247pHX3GV5k1oaIYFiYWkQ6pkzHcBQpeX3wYpMZReyUuWxFXeZbXv91N5lLnw5HiLQqyI1d8iPPijIQ')
    .then(dados => {
      res.render('index', { lista: dados.data })
    })
    .catch(erro => {
      res.render('error',{error: erro})
    })
  
});


router.get('/classe/:id', function(req, res, next) {
  
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id +'?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4MzM4NiwiZXhwIjoxNjExMDEyMTg2fQ.bnITdHpJwJxixlIToH5d-PJLbu3fdj_-zRPpvsGAnS49LrRBHYG8-Aabsg8qinor1KyaRDeQgscCaKCt-JwycmHM8VQD5Z2ypxlNPE6U67-_LU34S5cXez0seOO7KLeXcJJZFoz3zl8rU_TFX45CNPRfAYSjI2_OLqZfRNJbasJZ35-Jiz9mH8VBzofOGSRlgtDId2O8htlgkR2dsMOxzbRSrh5fQYoMEFvbP-YKIiLcyin6ao_k4nSYNEOzyg2L3DRjoE5247pHX3GV5k1oaIYFiYWkQ6pkzHcBQpeX3wYpMZReyUuWxFXeZbXv91N5lLnw5HiLQqyI1d8iPPijIQ')
    .then(dados => {

      axios.get('http://clav-api.di.uminho.pt/v2/classes/c'+ req.params.id +'/descendencia?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4MzM4NiwiZXhwIjoxNjExMDEyMTg2fQ.bnITdHpJwJxixlIToH5d-PJLbu3fdj_-zRPpvsGAnS49LrRBHYG8-Aabsg8qinor1KyaRDeQgscCaKCt-JwycmHM8VQD5Z2ypxlNPE6U67-_LU34S5cXez0seOO7KLeXcJJZFoz3zl8rU_TFX45CNPRfAYSjI2_OLqZfRNJbasJZ35-Jiz9mH8VBzofOGSRlgtDId2O8htlgkR2dsMOxzbRSrh5fQYoMEFvbP-YKIiLcyin6ao_k4nSYNEOzyg2L3DRjoE5247pHX3GV5k1oaIYFiYWkQ6pkzHcBQpeX3wYpMZReyUuWxFXeZbXv91N5lLnw5HiLQqyI1d8iPPijIQ')
      .then(desc => {
        
        res.render('info-classe', { lista: dados.data ,a: desc.data, })
      })
      .catch(erro => {
        
        res.render('error',{error: erro})
      })
    })
    .catch(erro => {
      
      res.render('error',{error: erro})
    })
  
});


module.exports = router;
