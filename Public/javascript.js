$(document).ready(function() {

	console.log("am i get here?")

	$.ajax();

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
        $('#row1').html(data[0].Name); 
        $('#row2').html(data[0].Phone);
        $('#row3').html(data[0].Website); 
        $('#row4').html(data[0].Street_Address);
        $('#row5').html(data[0].Zip_Code); 
        $('#row6').html(data[0].Hours);
        $('#row7').html(data[0].Rating);
    },

    error: function(xhr, status, error) { console.log("ERROR: ", error)}
    
});
