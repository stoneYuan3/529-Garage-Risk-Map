
$('document').ready(function(){
	var result1="";
	var connSuccess=false;
	spawnLabel();
	$.ajax({
		type:'POST',
		url:'server/base.php?request=0',
		data:{},
		dataType:'json',

		//load map///////
		success:function(data){
			result1=data[0];
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
				// postal_code.bindPopup(result1[i][1]);
				//$('path').eq(i) is equvalent to $('path')[i]
				//although [i] works fine with console log, it cannot have functions attached to it (ex, $('path')[i].attr(...)) leads to error "attr() is not a function"
				$('g path').eq(i).attr('id',result1[i][1]);		
			}

			var result_parking=data[1];
			console.log(result_parking);
			for(let i=0;i<result_parking.length;i++){
				var parking_each=result_parking[i];
				var parking_each_id=result_parking[i]['lot_id'];
				// https://onestepcode.com/leaflet-markers-svg-icons/
				var svgIcon = L.divIcon({
				  html: `
				<svg
				  width="24"
				  height="24"
				  viewBox="0 0 260 260"
				  version="1.1"
				  preserveAspectRatio="none"
				  xmlns="http://www.w3.org/2000/svg"
				  class="icon-parking"
				  id=`+parking_each_id+`
				>
				    <circle cx="130" cy="130" r="120" stroke-width="20" fill="black" />
				    <>
				    <text fill="white" font-size=160 font-weight=bold x=80 y=180 >P</text>
				</svg>`,
				  className: "",
				  iconSize: [24, 24],
				});		
				var marker = L.marker([parking_each['latitude'], parking_each['longitude']],{icon:svgIcon}).addTo(map);			
			}

		//END load map///////


			connSuccess=true;
			console.log(connSuccess);
			if(connSuccess){

				// $('.leaflet-marker-pane').addClass('style-hide');
				map.on('zoomend', function(ev){
					console.log(map.getZoom());
					if(map.getZoom()>11){
						$('.leaflet-marker-pane').removeClass('style-hide');
					}
					else{
						$('.leaflet-marker-pane').addClass('style-hide');
					}
				});
				$('.icon-parking').hover(
					function(){
						if($('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').removeClass('style-hide');
							console.log('sadasdasd');
						}
						$(this).attr('stroke','red');

						var number=$(this).attr("id");
						var link= 'server/base.php?request=3&code=';
						link+=number;	
						
						$.ajax({
							type:'POST',
							url: link,
							data:{},
							dataType:'json',	
							success:function(data){
								console.log(data);
								$('.section-hoverInfo').html(data);
							},
							error:function(data){
								console.log('You moron, you messed something up!');
							}													
						});								
					},
					function(){
						if(!$('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').addClass('style-hide');
						}						
						// if($(this).attr('stroke','red').length>0){
						$(this).removeAttr('stroke','red');
						$('.address').remove();
						// }
					}					
				);
				$('.icon-parking').click(
					function(){
						if($('.section-detailedInfo').hasClass('style-hide')){
							$('.section-detailedInfo').removeClass('style-hide');
						}
						var park_id=$(this).attr("id");
						var link= 'server/base.php?request=4&code=';
						link+=park_id;

						$.ajax({
							type:'POST',
							url: link,
							data:{},
							dataType:'text',	
							success:function(data){
								console.log(data);
								$('.section-detailedInfo').html(data);
								$('#section-close').click(
									function(){
										$('.section-detailedInfo').addClass('style-hide');
									}
								);								
							},
							error:function(data){
								console.log('You moron, you messed something up!');
							}													
						});							
					}
				);


				//START upon hover///////////////////
				$('path').hover(
					function(){
						$(this).css("stroke-width","5");
						var postal_code=$(this).attr("id");
						if($('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').removeClass('style-hide');
							var link= 'server/base.php?request=1&code=';
							link+=postal_code;						
							$.ajax({
								type:'POST',
								url: link,
								data:{},
								dataType:'json',	
								success:function(data){
									console.log(data);
									$('.section-hoverInfo').html(data);
								},
								error:function(data){
									console.log('You moron, you messed something up!');
								}													
							});	
						}

						// $('.leaflet-marker-pane').addClass('style-hide');
					},
					function(){
						$(this).css("stroke-width","1.5");
						if(!$('.section-hoverInfo').hasClass('style-hide')){
							$('.section-hoverInfo').addClass('style-hide');
						}	

						// $('.leaflet-marker-pane').removeClass('style-hide');											
					}
				);
				//END hover//////////////////////


				//START upon click///////////////////
				$('path').click(
					function(){
						if($('.section-detailedInfo').hasClass('style-hide')){
							$(this).css("stroke-width","5");
							$('.section-detailedInfo').removeClass('style-hide');
						}
						var postal_code=$(this).attr("id");
						var link= 'server/base.php?request=2&code=';
						link+=postal_code;

						$.ajax({
							type:'POST',
							url: link,
							data:{},
							dataType:'text',	
							success:function(data){
								console.log(data);
								$('.section-detailedInfo').html(data);
								$('#section-close').click(
									function(){
										$('.section-detailedInfo').addClass('style-hide');
									}
								);								
							},
							error:function(data){
								console.log('You moron, you messed something up!');
							}													
						});	
					}
					
				);
			}			
		},
		error:function(data){
			console.log('You moron, you messed something up!');
		}		
	});

});

