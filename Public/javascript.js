$(document).ready(function() {

	console.log("am i working")

	$.ajax();

    clicksearch();

    modaltrigger();

    addnewrestaurant();

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

        for (var i = 0; i < 10; i++) {

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
                
            $(".inforeq").empty();

            $(".inforeq").append(
                "<tr class='tableheader'>"
                +"<th>"
                +"</th>"
                +"<th>Name</th>"
                +"<th>Phone</th>"
                +"<th>Address</th>"
                +"<th>Zip</th>"
                +"<th>Hours</th>"
                +"<th class='ratinghead'>Rating</th>"
                );


            for (var i = 0; i < 10; i++) {

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

            }
        });
    })


}

    function modaltrigger(){
    var modal = document.getElementById('myModal');
    var btn = document.getElementById('add-button');
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

};

function addnewrestaurant(){

    $("#submitbutton").click(function(){
            var name = $('#Name').val()
            var phone = $('#Phone').val()
            var address = $('#Address').val()
            var zip = $('#Zip').val()
            var hours = $('#Hours').val()
            var website = $('#Website').val()
            var img = $('#Image-URL').val()
            console.log(name)


        $.post("/kens-third-route", {
                "ID": 1000,
                "Name": name,
                "Phone": phone,
                "Street_Address": address,
                "Zip_Code": zip,
                "Hours": hours,
                "Website": website,
                "Image_Url": img

            }, function(data, status){

                $(".submitfields").hide();

                $("#submitbutton").css("display", "none");

                $(".ty").show();

                $('.inforeq').append(
                    "<tr class='tablerow'>"
                    +"<td><img class='tableimg' src='"+img+"'/></td>"
                    +"<td><a href='"+website+"'>"
                    +"<h4>"+name+"</h4></a>"
                    +"</td>"
                    +"<td class='colTabPhone'>"+phone+"</td>"
                    +"<td>"
                    +address+"</td>"
                    +"<td>"+zip+"</td>"
                    +"<td class='colTabHours'>"+hours+"</td>"
                    +"<td>"+rating+"</td>"
                    );   

                console.log(data)
            });

    });
}
