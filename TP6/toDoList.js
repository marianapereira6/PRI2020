var http = require('http')
var axios = require('axios')
var fs = require('fs')


// Funções auxilidares
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
                      <th></th>
                      <th></th>
                      
                  </tr>
    `
      lista.forEach(a => {
          pagHTML += `
              <tr>
                  <td>${a.data}</td>
                  <td>${a.responsavel}</td>
                  <td>${a.descricao}</td>
                  <td><button class="w3-button w3-teal">✔️</button></td>
                  <td><button class="w3-button w3-teal">✖️</button></td>
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

  // Criação do servidor

var toDoListServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
        if((req.url == "/") || (req.url == "/toDoList")){
           /* axios.all([
                axios.get('http://localhost:3000/toDoList?_sort=data'),
                axios.get('http://localhost:3000/vistoCancelado?_sort=estado&_order=desc')
                ]).then(axios.spread((toListRes, vcRes) => {
                  this.lista = toListRes.data
                  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write( geraFormList(d ))
                        res.write(geraPagList(lista,d))
                  this.vc =   vcRes.data
                  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagVistoCancelado(vc,d))
                        res.end()
             }))*/
                axios.get("http://localhost:3000/toDoList?_sort=data")
                    .then(response => {
                        var lista = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write( geraFormList(d ))
                        res.write(geraPagList(lista,d))
                        axios.get("http://localhost:3000/vistoCancelado?_sort=estado&_order=desc")
                        .then(response => {
                        var l = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagVistoCancelado(l,d))
                        res.end()
                    })
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter to do list...")
                        res.end()
                    })
                    axios.get("http://localhost:3000/vistoCancelado?_sort=estado&_order=desc")
                    .then(response => {
                        var lista = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagVistoCancelado(lista,d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter to do list...")
                        res.end()
                    })

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

        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

toDoListServer.listen(4444)
console.log('Servidor à escuta na porta 4444...')