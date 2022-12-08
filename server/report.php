<?php
	require_once('functions.php');
	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(isset($_GET['query'])){
		if($_GET['query']=='report'){
			//2nd arguement of json_decode decide whether the result will be turned into an assoctive array
			//in this case the result received is an stdClass. has to be converted to an array in order to be used
			//https://stackoverflow.com/questions/18576762/php-stdclass-to-array
			$arr_bikeDetail=json_decode($_POST['bikeDetail'],true);
			//process bike detail form
			$query_bikeDetail="INSERT INTO bikes(nickname,manufacturer,model,serial_number,type,value)";
			$query_bikeDetail.="VALUES(?,?,?,?,?,?)";
			$stmt_bikeDetail=$database->prepare($query_bikeDetail);
			$stmt_bikeDetail->bind_param('ssssis',$arr_bikeDetail[0]['value'],$arr_bikeDetail[1]['value'],$arr_bikeDetail[2]['value'],$arr_bikeDetail[3]['value'],$arr_bikeDetail[4]['value'],$arr_bikeDetail[5]['value']);
			$stmt_bikeDetail->execute();

			$post_id=$database->insert_id;
			//process user uploaded image
			if(isset($_FILES['bikeImg'])){
				$arr_bikeImg=$_FILES['bikeImg'];

				$file_name=$arr_bikeImg['name'];
				$file_tempLink=$arr_bikeImg['tmp_name'];
				//move image to the folder
				$moveimage=move_uploaded_file($file_tempLink, "../img/".$file_name);
				if($moveimage){
					$file_link='img/'.$file_name;				
					$query_bikeImg="INSERT INTO images(bike_id,img_link)";
					$query_bikeImg.=" VALUES(?,?)";
					$stmt_bikeImg=$database->prepare($query_bikeImg);
					$stmt_bikeImg->bind_param('is',$post_id,$file_link);
					$stmt_bikeImg->execute();
				}				
			}
			//if no image uploaded, assign the file location of the placeholder image to the report
			else{
				$file_link='img/bike_placehoder.png';				
				$query_bikeImg="INSERT INTO images(bike_id,img_link)";
				$query_bikeImg.=" VALUES(?,?)";
				$stmt_bikeImg=$database->prepare($query_bikeImg);
				$stmt_bikeImg->bind_param('is',$post_id,$file_link);
				$stmt_bikeImg->execute();
			}


			$arr_theftReport=json_decode($_POST['theftReport'],true);
			//process theft report form
			if(!empty($arr_theftReport[3]['value'])){

				$query_theftReport="INSERT INTO theft_report(bike_id,report_date,postal_code,description,parking_lot)";
				$query_theftReport.=" VALUES(?,?,?,?,?)";
				$stmt_theftReport=$database->prepare($query_theftReport);				
				$stmt_theftReport->bind_param('isssi',$post_id,$arr_theftReport[0]['value'],$arr_theftReport[1]['value'],$arr_theftReport[2]['value'],$arr_theftReport[3]['value']);
				$stmt_theftReport->execute();
			}
			else{
				$query_theftReport="INSERT INTO theft_report(bike_id,report_date,postal_code,description)";
				$query_theftReport.=" VALUES(?,?,?,?)";
				$stmt_theftReport=$database->prepare($query_theftReport);				
				$stmt_theftReport->bind_param('isss',$post_id,$arr_theftReport[0]['value'],$arr_theftReport[1]['value'],$arr_theftReport[2]['value']);
				$stmt_theftReport->execute();
			}
			
		}
	}
?>
