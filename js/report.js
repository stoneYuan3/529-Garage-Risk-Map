$('document').ready(function(){

	$('.button-nav-report').click(function(){
		$(form_base).insertAfter('head');
		$('.section-formTitle h1').html('Tell us about your bike');
		$('#form').html(form_bikeDetail);
		$('#button-form-quit').click(function(){
			$('.section-report').remove();
		});

		$('#bike-detail').submit(function(event){
			$('.style-warning').remove();
			event.preventDefault();
			var data_bikeDetail=$(this).serializeArray();
			var formDone_bikedetail=true;
			var brand=data_bikeDetail[1]['value'];
			var model=data_bikeDetail[2]['value'];
			// console.log(data_bikeDetail[0]['value']);
			if(!brand){
			$('<p class="style-warning">Please fill in this section</p>').insertBefore('#brand');
				formDone_bikedetail=false;
			}
			if(!model){
			$('<p class="style-warning">Please fill in this section</p>').insertBefore('#model');
				formDone_bikedetail=false;
			}	

			if(formDone_bikedetail){
				$('#form').html(form_bikeImage);
				$('.section-formTitle h1').html('Upload image for your bike');				
				var formDone_bikeImg=true;
				var data_bikeImg=new FormData();
				var image=$('#img').prop('files')[0];				
				// console.log(data_bikeDetail);

				$('#bike-image').submit(function(event){
					$('.style-warning').remove();
					event.preventDefault();								
					data_bikeImg.append('img',image);
					$('#form').html(form_bikeTheftDetail);
					$('.section-formTitle h1').html('Tell us what happened');

					$('#bike-theftReport').submit(function(event){
						$('.style-warning').remove();
						event.preventDefault();							
						var data_theftReport=$(this).serializeArray();
						var formDone_theftReport=true;
						var brand=data_theftReport[1]['value'];
						if(!brand){
						$('<p class="style-warning">Please fill in this section</p>').insertBefore('#brand');
							formDone_bikedetail=false;
						}
						if(formDone_bikedetail){
							console.log(data_bikeDetail);
							console.log(data_bikeImg);
							console.log(data_theftReport);
							var arr=[data_bikeDetail,data_bikeImg,data_theftReport];
							var arr=JSON.stringify(arr);
							$.ajax({
								type:'POST',
								url:'server/report.php?query=report',
								// data:{'bikeDetail':JSON.stringfy(data_bikeDetail),'bikeImg':},
								data:{arr},
				              	contentType: false,
				              	processData: false,
								success:function(data){
									console.log(data);
								},
								error:function(data){
									console.log('error,report upload failed');
								}
							})			
						}												
					});
				});							
			}
		});	



	});


});