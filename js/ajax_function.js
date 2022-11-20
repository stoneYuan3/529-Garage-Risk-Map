function caseColour(number){
	if(number>=15){
		return '#99000d';		
	}
	else if(number>=10 && number<15){
		return '#ef3b2c';
	}
	else if(number>=6 && number<10){
		return '#fc9272';
	}
	else if(number>=3 && number<6){
		return '#fcbba1';
	}
	else if(number>0 && number<3){
		return '#fee0d2';
	}	
	else{
		return '#fff5f0';
	}			
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