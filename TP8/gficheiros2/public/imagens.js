// Image display on client browser

function showImage(name,type){
    if(type == 'image/png' || type=='image/jpeg')
        var file = $('<img src="/fileStore/' + name + '"width="80%"/>')
    else 
        var file = $('<p>'+ name + ',' + type+ '</p>')
    var download = $('<di><a href="/download/'+ name+'">Download</a></div>' )

    $("#dispaly").empty()
    $("#dispaly").append(file,download)
    $("#dispaly").modal()

}