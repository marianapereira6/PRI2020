const { collection } = require('../models/alunos')
var Aluno = require('../models/alunos')

module.exports.listar = () => {
    return Aluno 
        .find()
        .exec()
}

module.exports.consultar= n => {
    return Aluno
       .findOne({Número:n})
       .exec()    
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

module.exports.eliminar = id => {
    return Aluno
            .deleteOne({ _id: id })
}

module.exports.atualizar = (id, aluno) => {
    return Aluno
            .updateOne({ Número: id }, aluno)
}