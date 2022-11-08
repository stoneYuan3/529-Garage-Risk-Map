

$('document').ready(function(){
	var result1="";
	$.ajax({
		type:'POST',
		url:'server/base.php',
		data:{},
		dataType:'json',

		success:function(data){
			result1=data;
			console.log(result1);
			// $('#result').html(result1);	
			var myStyle = {
			    "color": "#ff7800",
			    "weight": 5,
			    "opacity": 0.65
			};

			L.geoJSON(result1, {
			    style: myStyle
			}).addTo(map);						
		},

        error:function(data){
            console.log('You moron, you messed something up!');
        }		

	});

});



