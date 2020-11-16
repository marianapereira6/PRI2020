const http = require('http');
const axios = require('axios');

function pedido(tipo, res) {
  res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
  })
  axios.get(`http://localhost:3000${tipo}`)
      .then((resp) => {
          list = resp.data;
          res.write('<ul>');
          list.forEach(a => {
              res.write(`<li><a href=\"http://localhost:3001${tipo}/${a.id}">${a.id}</a></li>`);
          });
          res.write('</ul>');
          res.end();
      }).catch((err) => {
          console.log('Erro :'+err);
          res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
          res.end();
      });
}


function alunos_id(id,res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    axios.get(`http://localhost:3000/alunos/${id}`)
        .then((resp) => {
            alunos = resp.data;
            res.write('<ul>');
            res.write('<h2> Dados dos Alunos</h2>');
            res.write('<p>Id :' + alunos.id + '</p>');
            res.write('<p>Nome : ' + alunos.nome + '</p>');
            res.write('<p>Data de Nascimento : ' + alunos.dataNasc + '</p>');
            res.write(`<p>Curso : <a href=\"http://localhost:3001/cursos/${alunos.curso}\">${alunos.curso}</a></p>`);
            res.write('<p>Ano do Curso  : ' + alunos.anoCurso + '</p>');
            res.write('<p>Instrumento  : ' + alunos.instrumento + '</p>');
            res.write(`<p><a href=\"http://localhost:3001/\">Indice</a></p>`)
            res.write('</ul>');
            res.end();
        }).catch((err) => {
            console.log('Erro :'+err);
            res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
            res.end();
        });
  }

function cursos_id(id,res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    axios.get(`http://localhost:3000/cursos/${id}`)
        .then((resp) => {
            cursos = resp.data;
            res.write('<ul>');
            res.write('<h2> Dados do Curso:</h2>');
            res.write('<p>Id :' + cursos.id + '</p>');
            res.write('<p>Designaçao : ' + cursos.designacao + '</p>');
            res.write('<p>Duraçao : ' + cursos.duracao + '</p>');
            res.write(`<p>Instrumento : <a href=\"http://localhost:3001/instrumentos/${cursos.instrumento.id}\">${cursos.instrumento.id}</a></p>`);
            res.write(`<p><a href=\"http://localhost:3001/\">Indice</a></p>`);
            res.write('</ul>');
            res.end();
        }).catch((err) => {
            console.log('Erro :'+err);
            res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
            res.end();
        });
  }

  function instrumentos_id(id,res){
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    })
    axios.get(`http://localhost:3000/instrumentos/${id}`)
        .then((resp) => {
            instrumentos = resp.data;
            res.write('<ul>');
            res.write('<h2> Dados do Instrumento:</h2>');
            res.write('<p>Id :' + instrumentos.id + '</p>');
            res.write('<p>Designiçao : ' + instrumentos["#text"] + '</p>');
            res.write(`<p><a href=\"http://localhost:3001/\">Indice</a></p>`);
            res.write('</ul>');
            res.end();
        }).catch((err) => {
            console.log('Erro :'+err);
            res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
            res.end();
        });
  }

var servidor = http.createServer(function (req, res){
    
    console.log(req.method + ' ' + req.url);
    options = ['/alunos', '/cursos', '/instrumentos']

    if (req.method == 'GET') {
        var listaUrl = req.url.split("/");
                listaUrl.shift();
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>');
            res.write('<li><a href=\"http://localhost:3001/alunos\">Lista de alunos</a></li>')
            res.write('<li><a href=\"http://localhost:3001/cursos\">Lista de cursos</a></li>')
            res.write('<li><a href=\"http://localhost:3001/instrumentos\">Lista de instrumentos</a></li>')
            res.write('</ul>');
            res.end();
        }
        else if(options.includes(req.url)) {
            pedido(req.url, res);
            console.log('Tipo: '+ req.url ); 
            
        }
                
        else if (req.url.match(/\/alunos\/[AE]+[0-9-]+/)){
                alunos_id(listaUrl[1],res);
                console.log('Id alunos: ' + listaUrl[1]);

            
        }

        else if (req.url.match(/\/cursos\/[CBS]+[0-9]+/)){
            cursos_id(listaUrl[1],res);
            console.log('Id cursos: ' + listaUrl[1]);

        
    }
        else if(req.url.match(/\/instrumentos\/[A-za-z ]+/)){
            instrumentos_id(listaUrl[1],res);
            console.log('Id instrumento:' + listaUrl[1]);
        }
        
        
    }

    else{
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write('<p>Pedido nao suportado: ' + req.method + '</p>');
        res.end();
    }
})
servidor.listen(3001);
console.log('Listening 3001');
