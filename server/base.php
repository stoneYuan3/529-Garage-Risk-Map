<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);


	if(isset($_GET['request'])){

		switch($_GET['request']){
			//load map
			case 0:
				//JSON_OBJECT() is used to stick non JSON variables together into a JSON object
				//not needed when the data stored is already vaild JSON (in fact it causes issues)
				$query_1="SELECT properties,postal_code,num_of_cases FROM postal_code_map";
				////
				$arr_finalOutput=[];

				$q2="SELECT postal_code_map.postal_code FROM postal_code_map";
				$s1=$database->query($q2);
				$arr_pCodeList=[];
				for($i=0;$i<$s1->num_rows;$i++){
					$result=$s1->fetch_row();
					//0 is JSON, 1 is postal code, 2 is number of cases
					array_push($arr_pCodeList,$result[0]);
				}				
				$arr_mapTile=[];
				for($i=0;$i<count($arr_pCodeList);$i++){
					$code_each=$arr_pCodeList[$i];
					$q3="SELECT postal_code_map.properties, postal_code_map.postal_code, COUNT(theft_report.postal_code) FROM postal_code_map,theft_report WHERE postal_code_map.postal_code=theft_report.postal_code AND postal_code_map.postal_code='".$code_each."'";
					$s2=$database->query($q3);
					$result=$s2->fetch_row();
					array_push($arr_mapTile,$result);
				}

				$query_parkingLot="SELECT lot_id,latitude,longitude,postal_code FROM parking_lot";
				$result_parkingLot=$database->query($query_parkingLot);
				$arr_parkingLot=[];
				for($i=0;$i<$result_parkingLot->num_rows;$i++){
					$result_each=$result_parkingLot->fetch_assoc();
					array_push($arr_parkingLot, $result_each);
				}


				$arr_finalOutput=[$arr_mapTile,$arr_parkingLot];
				echo json_encode($arr_finalOutput);
				////
				break;

			//load info for each section when hovering
			case 1:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT postal_code_map.postal_code,COUNT(theft_report.postal_code) AS case_num,postal_code_map.city FROM postal_code_map,theft_report WHERE postal_code_map.postal_code='".$code."'AND postal_code_map.postal_code=theft_report.postal_code";
					$result=$database->query($query_1);
					$output=$result->fetch_assoc();
					
					$output_layout='<h1>'.$output['postal_code'].'</h1>';
					$output_layout.='<p>'.$output['city'].'</p>';
					$output_layout.='<p><strong>'.$output['case_num'].' reports</strong></p>';
					echo json_encode($output_layout);

				}
				break;

			//load info for each section when clicked
			case 2:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT theft_report.postal_code,theft_report.report_date,bikes.manufacturer,bikes.model,bikes.type,images.img_link FROM theft_report,bikes,images WHERE theft_report.postal_code='".$code."' AND theft_report.bike_id=bikes.id AND bikes.id=images.bike_id";
					$query_title="SELECT postal_code_map.`postal_code`,COUNT(theft_report.`postal_code`) AS case_num,postal_code_map.city FROM theft_report,postal_code_map WHERE postal_code_map.postal_code='".$code."' AND postal_code_map.postal_code=theft_report.postal_code";
					$result=$database->query($query_1);
					$result_title=$database->query($query_title);
					$output_title=$result_title->fetch_assoc();

					$output_array=[];

					echo '
			            <div class="flex flex-column section-titleBar">
			              <div class="flex flex-row">
			                <h1>'.$output_title['postal_code'].'</h1>
			                <button id="section-close">Close</button>
			              </div>
						  <p>'.$output_title['city'].'</p>
			              <p><strong>'.$output_title['case_num'].' reports</strong></p>
			            </div>
					';

					echo '<div class="flex flex-column section-allCases">';
					for($i=0;$i<$result->num_rows;$i++){
						$output_each=$result->fetch_assoc();
						// print_r($output_each);
						// array_push($output_array,$output_each);
						echo '
			              <div class="flex flex-row section-caseReport">
			                <img src='.$output_each['img_link'].'>
			                <div class="flex flex-column section-case-texts">
			                  <h2>'. $output_each['manufacturer'] . ' ' . $output_each['model'] . '</h2>    
			                  <p>reported on '. $output_each['report_date'] .'</p>
			                </div>
			              </div>							
						';
					}
					echo '</div>';
				}
				break;

			//load info for each parking lot icon when hovering
			case 3:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT parking_lot.lot_id, parking_lot.name, parking_lot.postal_code, COUNT(theft_report.parking_lot) AS case_num,parking_lot.address FROM parking_lot, theft_report WHERE parking_lot.lot_id=".$code." AND parking_lot.lot_id=theft_report.parking_lot";
					$result=$database->query($query_1);
					$output=$result->fetch_assoc();

					$output_layout='';
					
					if(!$output['name']){
						$output_layout.='<h1>Unnamed Bike Rack</h1>';
					}
					else{
						$output_layout.='<h1>'.$output['name'].'</h1>';
					}
					$output_layout.='<h2 class="style-lot-id"><em>Parking lot #'.$output['lot_id'].'</em></h2>';
					$output_layout.='
						<p class="p-address">'.$output['address'].'</p>
						<p><strong>'.$output['case_num'].' reports</strong></p>
					';
					echo json_encode($output_layout);

					// echo json_encode($output);
				}				
				break;

			//load info for each parking lot icon when clicked
			case 4:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_cases="SELECT theft_report.parking_lot,theft_report.report_date,bikes.manufacturer,bikes.model,bikes.type,images.img_link FROM theft_report,bikes,images WHERE theft_report.parking_lot='".$code."' AND theft_report.bike_id=bikes.id AND bikes.id=images.bike_id";
					$query_title="SELECT parking_lot.lot_id, parking_lot.name, parking_lot.address, parking_lot.description, COUNT(theft_report.parking_lot) AS case_num,parking_lot.fee FROM parking_lot,theft_report WHERE parking_lot.lot_id=".$code." AND parking_lot.lot_id=theft_report.parking_lot";
					$result_cases=$database->query($query_cases);
					$result_title=$database->query($query_title);
					$output_title=$result_title->fetch_assoc();

					$output_array=[];
					$title='';
					$desc='';
					$title_lot_id='<h2 class="style-lot-id"><em>Parking lot #'.$output_title['lot_id'].'</em></h2>';
					if(!$output_title['name']){
						$title='Unnamed Bike Rack';
					}
					else{
						$title=$output_title['name'];
					}
					if(!$output_title['description']){
						$desc='No security measure specified';
					}
					else{
						$desc=$output_title['description'];
					}					
					echo '
			            <div class="flex flex-column section-titleBar">
			              <div class="flex flex-row">
			              	<div class="flex flex-column">
			                	<h1>'.$title.'</h1>
			                </div>
			                <button id="section-close">Close</button>
			              </div>
			              '.$title_lot_id.'
			              <p class="p-address">'.$output_title['address'].'</p>
			              <p><strong>'.$output_title['case_num'].' reports</strong> located in this rack</p>
			              <h2>Security Measures:</h2>
			              <p>'.$desc.'</p>
			              <h2>Fee:</h2>
			              <p>'.$output_title['fee'].'</p>
			            </div>
					';

					echo '<div class="flex flex-column section-allCases">';
					echo '<h2>Reported Cases:</h2>';
					if($result_cases->num_rows>0){
						for($i=0;$i<$result_cases->num_rows;$i++){
							$output_each=$result_cases->fetch_assoc();
							// print_r($output_each);
							// array_push($output_array,$output_each);
							echo '
				              <div class="flex flex-row section-caseReport">
				                <img src='.$output_each['img_link'].'>
				                <div class="flex flex-column section-case-texts">
				                  <h2>'. $output_each['manufacturer'] . ' ' . $output_each['model'] . '</h2>    
				                  <p>reported on '. $output_each['report_date'] .'</p>
				                </div>
				              </div>							
							';
						}
					}
					else{
						echo '<p>no case reported</p>';
					}
					echo '</div>';
				}
				break;
		}

	}//END if(isset($_GET['request']))//////////////////

?>