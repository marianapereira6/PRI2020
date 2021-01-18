var Casamento = require('../models/casamento')

module.exports.listar = () =>{
    return Casamento
            .find({},{_id:1,title:1,date:1})
            .exec()
}

module.exports.consultar = id =>{
    return Casamento
            .find({_id: id})
            .exec()
}


module.exports.filtraNome = t =>{
    return Casamento
            .find({title: {$regex : '.*' +t +'.*'}})
            .exec()
}

module.exports.filtraAno = (ano) =>{
    return Casamento
            .find({date: {$regex : '.*' +ano +'.*'}})
            .exec()
}

module.exports.filtraByAno = () =>{
    return Casamento
        .aggregate([{$unwind: "$date"},{$group: {_id: "$date"} },{$sort: {date: -1}}])
        .exec()
}

module.exports.noivos = () =>{
    return Casamento
            .find({},{_id:1,title:1,date:1})
            .exec()
}