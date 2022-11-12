

$('document').ready(function(){
	var result1="";
	$.ajax({
		type:'POST',
		url:'server/base.php',
		data:{},
		dataType:'json',

		success:function(data){
			result1=data;
			// console.log(result1[0]);
			// $('#result').html(result1);	
			var myStyle = {
			    "color": "red",
			    "weight": 1,
			    "opacity": 0.65
			};

			// for(let i=0;i<result1.length;i++){
				// console.log(result1[i]);
			L.geoJSON(result1, {
			    style: myStyle
			}).addTo(map);					
			// }	
		},

        error:function(data){
            console.log('You moron, you messed something up!');
        }		

	});

});



