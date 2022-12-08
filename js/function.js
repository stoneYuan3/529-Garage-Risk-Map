function caseColour(number){
	if(number>=13){
		return '#99000d';		
	}
	else if(number>=9 && number<13){
		return '#ef3b2c';
	}
	else if(number>=5 && number<9){
		return '#fc9272';
	}
	else if(number>=2 && number<5){
		return '#fcbba1';
	}
	else if(number>0 && number<2){
		return '#fee0d2';
	}	
	else{
		return '#fff5f0';
	}			
}



function spawnLabel(){
	var label_colour=['#99000d','#ef3b2c','#fc9272','#fcbba1','#fee0d2','#fff5f0'];
	var label_level=['>13 reports','9-13 reports','5-9 reports','2-5 reports','0-2 reports','no reports'];

	var layout='<h1>Label</h1>';
	for(let i=0;i<label_level.length;i++){
		layout+='<div class="flex flex-row">';
		layout+='<svg width="1.5rem" height="1.5rem"><rect width="1.5rem" height="1.5rem" style="fill:'+label_colour[i]+';"></svg>';
		layout+='<p>'+label_level[i]+'</p>';
		layout+='</div>';
	}
	layout+='<div class="flex flex-row">'
	layout+='<svg width="24" height="24" viewBox="0 0 260 260" version="1.1" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="icon-parking"> <circle cx="130" cy="130" r="120" stroke-width="20" fill="black" /> <> <text fill="white" font-size=160 font-weight=bold x=80 y=180 >P</text> </svg>'
	layout+='<p>Bike Parking</p>';
	layout+='</div>';
	$('.section-label').html(layout);
}

// function caseColour(number){
// 	if(number>=200){
// 		return '#99000d';		
// 	}
// 	else if(number>=100 && number<200){
// 		return '#ef3b2c';
// 	}
// 	else if(number>=50 && number<100){
// 		return '#fc9272';
// 	}
// 	else if(number>=25 && number<50){
// 		return '#fcbba1';
// 	}
// 	else if(number>0 && number<25){
// 		return '#fee0d2';
// 	}	
// 	else{
// 		return '#fff5f0';
// 	}			
// }

// function sectionHoverAjax(link){
// 	$.ajax({
// 		type:'POST',
// 		url: link,
// 		data:{},
// 		dataType:'json',	
// 		success:function(data){
// 			console.log(data);
// 			$('.section-hoverInfo h1').html(data[0]);
// 			$('.section-hoverInfo p').html(data[1]+" cases");
// 		},
// 		error:function(data){
// 			console.log('You moron, you messed something up!');
// 		}													
// 	});	
// }

// function sectionClickAjax(link){
// 	$.ajax({
// 		type:'POST',
// 		url: link,
// 		data:{},
// 		dataType:'text',	
// 		success:function(data){
// 			console.log(data);
// 			$('.section-detailedInfo').html(data);
// 		},
// 		error:function(data){
// 			console.log('You moron, you messed something up!');
// 		}													
// 	});		
// }