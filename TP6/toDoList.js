var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')


// Funções auxilidares
function recuperaInfo(request, callback){
    if (request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data',bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}
// Template para a página com to do List ------------------
function geraPagList( lista, d){
    let pagHTML = `
      <html>
          <head>
              <title>To Do List</title>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>To Do List</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Data limite</th>
                      <th>Responsável</th>
                      <th>Descrição</th>
                      <th>Feito</th>
                      <th>Cancelado</th>
                      
                  </tr>
    `
      lista.forEach(a => {
          pagHTML += `
              <tr>
                  <td>${a.data}</td>
                  <td>${a.responsavel}</td>
                  <td>${a.descricao}</td>
                  <form class="w3-container" action="/confirmation" method="POST">
                  <td><input class="w3-btn w3-blue-teal" type="submit" value="✔️"/></td>
                  </form>
                  <form class="w3-container" action="/cancel" method="POST">
                  <td><input class="w3-btn w3-blue-teal" type="submit" value="x"/></td>
                  </form>
              </tr>
          `
      });
      
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
        
          </div>
      </body>
      </html>
    `
    return pagHTML
}

  // Template para o formulário de aluno ------------------
function geraFormList( d ){
    return `
    <html>
        <head>
            <title>Nova Tarefa</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Nova Tarefa</h2>
            </div>

            <form class="w3-container" action="/toDoList" method="POST">
                <label class="w3-text-teal"><b>Data Limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data">
          
                <label class="w3-text-teal"><b>Descriçao</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

                <label class="w3-text-teal"><b>Responsavel</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                <input class="w3-btn w3-blue-teal" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-teal" type="reset" value="Limpar valores"/>
            </form>

        </body>
    </html>
    `
}

// Template para a página com a lista de visto e cancelados ------------------
function geraPagVistoCancelado( lista, d){
    let pagHTML = `
      <html>
          <head>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>Lista dos Visto e Cancelados </h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Estado</th>
                      <th>Data limite</th>
                      <th>Responsável</th>
                      <th>Descrição</th>
                  </tr>
    `
      lista.forEach(a => {
          pagHTML += `
              <tr>
                  <td>${a.estado}</td>
                  <td>${a.data}</td>
                  <td>${a.responsavel}</td>
                  <td>${a.descricao}</td>
              </tr>
          `
      });
      
    pagHTML += `
          </table>
          <div class="w3-container w3-teal">
              <address>Gerado por ToDoList::PRI2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( registo, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${registo.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Nova tarefa ${registo.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/toDoList">Aceda aqui Ã  sua pÃ¡gina."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por ToDoList::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}




  // Criação do servidor

var toDoListServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
        if((req.url == "/") || (req.url == "/toDoList")){
            axios.all([
                axios.get('http://localhost:3000/toDoList?_sort=data'),
                axios.get('http://localhost:3000/vistoCancelado?_sort=estado&_order=desc')
                ]).then(axios.spread((toListRes, vcRes) => {
                  lista = toListRes.data
                  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                  res.write( geraFormList(d ))
                  res.write(geraPagList(lista,d))
                  vc = vcRes.data
                  res.write(geraPagVistoCancelado(vc,d))
                  res.end()
             }))

        }
        else if(/w3.css$/.test(req.url)){
            fs.readFile("w3.css", function(erro, dados){ 
            if(!erro){
                res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                 res.write(dados)
                 res.end()
            }
            })
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
            res.end()
        }
        break

        case "POST":
            if((req.url == "/") || (req.url == "/toDoList")){
                recuperaInfo(req, info => {
                    console.log('Post :' + JSON.stringify(info))
                    axios.post('http://localhost:3000/toDoList', info)
                    .then(resp => {
                        res.writeHead(302, {'Location': '' + req.url});
                        res.end() 
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro no Post:' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                })
            }
            else if((req.url == "/confirmation")){
                recuperaInfo(req, info => {
                    console.log('Confirmatiom :' + JSON.stringify(info))
                    axios.post('http://localhost:3000/vistoCancelado', info)
                    .then(resp => {
                        res.writeHead(302, {'Location': '' + req.url});
                        res.end() 
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro no Post:' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                })
            }
            
            else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break

        case "Add" :
            if((req.url == "/") || (req.url == "/toDoList")){
                recuperaInfo(req, info => {
                    console.log('Add :' + JSON.stringify(info))
                    axios.post('http://localhost:3000/vistoCancelado', info)
                    .then(resp => {
                        res.writeHead(302, {'Location': '' + req.url});
                        res.end() 
                    })
                    .catch(erro => {
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write('<p>Erro no Post:' + erro + '</p>')
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                })
            }
            
            else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.url + " não suportado neste serviço.</p>")
                res.end()
            }

            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

toDoListServer.listen(4444)
console.log('Servidor à escuta na porta 4444...')