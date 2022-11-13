
function caseColour(number){
	// switch (number){
	// 	case number>=200:
	// 		return '#99000d';
	// 		break;
	// 	case number>=100 && number<200:
	// 		return '#ef3b2c';
	// 		break;
	// 	case number>=50 && number<100:
	// 		return '#fc9272';
	// 		break;
	// 	case number>=25 && number<50:
	// 		return '#fcbba1';
	// 		break;
	// 	case number>0 && number<25:
	// 		return '#fee0d2';
	// 		break;		
	// 	case number==0:
	// 		return '#fff5f0';
	// 		break;		
	// }
	if(number>=200){
		return '#99000d';		
	}
	else if(number>=100 && number<200){
		return '#ef3b2c';
	}
	else if(number>=50 && number<100){
		return '#fc9272';
	}
	else if(number>=25 && number<50){
		return '#fcbba1';
	}
	else if(number>0 && number<25){
		return '#fee0d2';
	}	
	else{
		return '#fff5f0';
	}			
}

$('document').ready(function(){
	var result1="";
	$.ajax({
		type:'POST',
		url:'server/base.php?request=0',
		data:{},
		dataType:'json',

		success:function(data){
			result1=data;
			// console.log(result1[0]);
			// $('#result').html(result1);	

			for(let i=0;i<result1.length;i++){
				//0 is JSON, 1 is postal code, 2 is number of cases
				// $('#test').append(result1[i][0]);
				var fill=caseColour(result1[i][2]);
				// console.log(result1[i][1]);
				console.log(fill);
				var myStyle = {
					"fillColor":fill,
					"fillOpacity":0.75,
					// "fillOpacity":result1[i][1],
					"color": 'black',
					"weight": 1.5,
					"dashArray":3
				    // "opacity": 0
				    // "opacity": result1[i][1]
				};
				//base.php json encoded the entire array but not individual objects within the array
				//must JSON.parse the specific array key that refers to the json object again
				//or error "invaild geoJSON object" will occur
				var geoj=JSON.parse(result1[i][0]);
				// console.log(geoj);
				// console.log(JSON.parse(result1[0][0]));
				// console.log(result1[i][1]);
				
				L.geoJSON(geoj, {
					style: myStyle
				}).addTo(map);	

			}

		},

		error:function(data){
			console.log('You moron, you messed something up!');
		}		

	});

});



