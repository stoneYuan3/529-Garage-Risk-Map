
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
				var postal_code=L.geoJSON(geoj, {
					style: myStyle
				}).addTo(map);
				postal_code.bindPopup(result1[i][1]);

				//$('path').eq(i) is equvalent to $('path')[i]
				//although [i] works fine with console log, it cannot have functions attached to it (ex, $('path')[i].attr(...)) leads to error "attr() is not a function"
				$('g path').eq(i).attr('id',result1[i][1]);		
			}
			connSuccess=true;
			console.log(connSuccess);
			if(connSuccess){
				//START hover///////////////////
				$('path').hover(
					function(){
						$(this).css("stroke-width","5");
						var postal_code=$(this).attr("id");
						if($('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').removeClass('style-hide');
							var link= 'server/base.php?request=1&code=';
							link+=postal_code;						
							sectionHover(link);
						}
					},
					function(){
						$(this).css("stroke-width","1.5");
						if(!$('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').addClass('style-hide');
						}						
					}
				);
				//END hover//////////////////////

				$('path').click(
					function(){
						if($('.section-detailedInfo').hasClass('style-hide')){
							$(this).css("stroke-width","5");
							$('.section-detailedInfo').removeClass('style-hide');
							var postal_code=$(this).attr("id");
							var link= 'server/base.php?request=2&code=';
							link+=postal_code;

							$.ajax({
								type:'POST',
								url: link,
								data:{},
								dataType:'json',	
								success:function(data){
									console.log(data);
									$('.section-hoverInfo h1').html(data[0]);
									$('.section-hoverInfo p').html(data[1]+" cases");
								},
								error:function(data){
									console.log('You moron, you messed something up!');
								}													
							});	
						}
					
						// else{
						// 	$(this).css("stroke-width","5");
						// 	$('.section-detailedInfo').addClass('style-hide');
						// }
					}
				);
				$('.section-titleBar button').click(
					function(){
						$('.section-detailedInfo').addClass('style-hide');
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