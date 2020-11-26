function apagarAluno(ident){
    axios.delete('/alunos/'+ident)
        .then(response => window.location.assign('/alunos'))
        .catch(error => console.log(error))
}


function atualizar(id) {
    console.log("aaaa")
    const newAluno = {
        Número: document.getElementById('Número').value,
        Nome: document.getElementById('Nome').value,
        Git: document.getElementById('Git').value,
    }

    axios.put('/alunos/' + id, newAluno)
        console.log("helo")
        .then(response => window.location.assign('/alunos/' + id))
        .catch(err => console.log(err))
}