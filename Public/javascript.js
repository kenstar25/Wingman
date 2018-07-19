$(document).ready(function() {

	console.log("am i working")

	$.ajax();

    clicksearch();

	})

	$.ajax({
    method: "GET",
    url: "/kens-first-route",
    dataType: 'json',
    headers: {
        'Content-Type':'application/json',
        'Access-Control-Allow-Headers':'*'
    },

    success: function(data) {
        
    console.log(data);

        for (var i = 0; i < 5; i++) {

            $('.inforeq').append(
                    "<tr class='tablerow'>"
                    +"<td><img class='tableimg' src='"+data[i].Image_Url+"'/></td>"
                    +"<td><a href='"+data[i].Website+"'>"
                    +"<h4>"+data[i].Name+"</h4></a>"
                    +"</td>"
                    +"<td class='colTabPhone'>"+data[i].Phone+"</td>"
                    +"<td>"+data[i].Street_Address+"</td>"
                    +"<td>"+data[i].Zip_Code+"</td>"
                    +"<td class='colTabHours'>"+data[i].Hours+"</td>"
                    +"<td>"+data[i].Rating+"</td>"
                    );   
            }
    },

    error: function(xhr, status, error) { console.log("ERROR: ", error)}
    
    });

function clicksearch(){

    $("#searchbutton").click(function(){
        var kensseachterm = $("#searchbar").val()
        console.log(kensseachterm);

        $.ajax({
            method: "GET",
            url: "/kens-second-route?searchfunction="+kensseachterm,
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },

            success: function(data) {
                
            console.log(data);

            }
        });
    })


}