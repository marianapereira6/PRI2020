var http = require('http')
var fs = require('fs')

var servidor = http.createServer(function (req, res) {
    
    var num = req.url.split("/")[1]     

    if(req.url.match(/\/[1-9]+$/)){
        console.log(num)
        fs.readFile('./xsl/site/arq'+num+'.html',function (err, data) {
            if(err){
                console.log("ERRO na leitura do ficheiro: " + err)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Ficheiro inexistente.</p>")
                res.end()
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data)
                res.end()
            }
        })
        
    }
    
     else { console.log(num)
            if (num === "index.html" || num === "" || num === "index"){
                    console.log(num)
                    fs.readFile('./xsl/site/index.html',function (err, data) {
                        if(err){
                            console.log("ERRO na leitura do ficheiro: " + err)
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write("<p>Ficheiro inexistente.</p>")
                            res.end()
                        }
                        else{
                            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                            res.write(data)
                            res.end()
                        }
                    })

            }
            else{
                console.log("ERRO ficheiro não encontrado")
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Ficheiro inexistente.</p>")
                res.end()
            }
     }    
    })

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777')