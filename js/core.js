



$('document').ready(function(){
	var result1="";
	var connSuccess=false;
	$.ajax({
		type:'POST',
		url:'server/base.php?request=0',
		data:{},
		dataType:'json',

		success:function(data){
			result1=data;
			var jsonlist="[";
			for(let i=0;i<result1.length;i++){
				//0 is JSON, 1 is postal code, 2 is number of cases
				// $('#test').append(result1[i][0]);
				var fill=caseColour(result1[i][2]);
				console.log(fill);
				var myStyle = {
					"fillColor":fill,
					"fillOpacity":0.75,
					"color": 'black',
					"weight": 1.5,
					"dashArray":3
				};
				//base.php json encoded the entire array but not individual objects within the array
				//must JSON.parse the specific array key that refers to the json object again
				//or error "invaild geoJSON object" will occur
				// var geoj=JSON.parse(result1[i][0]);
				var geoj=result1[i][0];
				// jsonlist.push(geoj);
				jsonlist+=geoj;
				jsonlist+=',';
			}
			//cut the last comma
			jsonlist=jsonlist.slice(0,-1);
			jsonlist+="]";
			jsonlist=JSON.parse(jsonlist)
			console.log(jsonlist);
			// console.log(JSON.parse(jsonlist));
			var postal_code=L.geoJSON(jsonlist, {
				style:getStyle(2)
			}).addTo(map);
			
			connSuccess=true;
			console.log(connSuccess);
			if(connSuccess){
				// map.on('click', highlightFeature);
				$('path').hover(
					function(){
						$(this).css("stroke-width","5");
					},
					function(){
						$(this).css("stroke-width","1.5");
					}			
				);
			}			
		},
		error:function(data){
			console.log('You moron, you messed something up!');
		}		
	});
	
	// if(connSuccess){
	// 	// map.on('click', highlightFeature);
	// 	$('path').hover(
	// 		function(){
	// 			$(this).css("stroke-width","3");
	// 		},
	// 		function(){
	// 			$(this).css("stroke-width","1.5");
	// 		}			
	// 	);
	// }



});


function getStyle(feature){
	return{
	"fillColor":caseColour(feature),
	"fillOpacity":0.75,
	"color": 'black',
	"weight": 1.5,
	"dashArray":3	
	};
}

function caseColour(number){
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

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7
	});

	layer.bringToFront();
}
function resetHighlight(e) {
	geojson.resetStyle(e.target);
}