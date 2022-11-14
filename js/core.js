
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
			// console.log(result1[0]);
			// $('#result').html(result1);	
			for(let i=0;i<result1.length;i++){
				//0 is JSON, 1 is postal code, 2 is number of cases
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
				var geoj=JSON.parse(result1[i][0]);
				// console.log(geoj);
				// console.log(JSON.parse(result1[0][0]));
				// console.log(result1[i][1]);

				var postal_code=L.geoJSON(geoj, {
					style: myStyle
				}).addTo(map);
				postal_code.bindPopup(result1[i][1]);

				//$('path').eq(i) is equvalent to $('path')[i]
				//although [i] works fine with console log, it cannot have functions attached to it (ex, $('path')[i].attr(...)) leads to error "attr() is not a function"
				$('g path').eq(i).attr('id',result1[i][1]);		
					// console.log($('g path').length);
					// console.log($('g path')[i]);
					// console.log($('path[id]').length>0);
			}
			connSuccess=true;
			console.log(connSuccess);
			if(connSuccess){
				// map.on('click', highlightFeature);
				$('path').hover(
					function(){
						$(this).css("stroke-width","5");
						console.log($(this).attr("id"));
							// $.ajax({
							// 	type:'POST',
							// 	url:'server/base.php?request=1',
							// 	data:{},
							// 	dataType:'json',
							// 	success:function(data){
							// 		console.log("yee");
							// 	}
							// });									
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

});



// function highlightFeature(e) {
// 	var layer = e.target;

// 	layer.setStyle({
// 		weight: 5,
// 		color: '#666',
// 		dashArray: '',
// 		fillOpacity: 0.7
// 	});

// 	layer.bringToFront();
// }
// function resetHighlight(e) {
// 	geojson.resetStyle(e.target);
// }