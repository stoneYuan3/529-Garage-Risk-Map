

<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);


	if(isset($_GET['request'])){

		switch($_GET['request']){
			case 0:
				//JSON_OBJECT() is used to stick non JSON variables together into a JSON object
				//not needed when the data stored is already vaild JSON (in fact it causes issues)
				$query_1="SELECT properties,postal_code,num_of_cases FROM postal_code_map";

				////
				$q2="SELECT postal_code_map.postal_code FROM postal_code_map";
				$s1=$database->query($q2);
				$arr1=[];
				for($i=0;$i<$s1->num_rows;$i++){
					$result=$s1->fetch_row();
					//0 is JSON, 1 is postal code, 2 is number of cases
					array_push($arr1,$result[0]);
				}				
				// print_r($arr1);
				$arr2=[];
				for($i=0;$i<count($arr1);$i++){
					$code_each=$arr1[$i];
					$q3="SELECT postal_code_map.properties, postal_code_map.postal_code, COUNT(theft_report.postal_code) FROM postal_code_map,theft_report WHERE postal_code_map.postal_code=theft_report.postal_code AND postal_code_map.postal_code='".$code_each."'";
					$s2=$database->query($q3);
					$result=$s2->fetch_row();
					array_push($arr2,$result);
				}
				// print_r($arr2);
				echo json_encode($arr2);
				////

				// $search=$database->query($query_1);
				// $output_arr=[];
				// $output='[';
				// for($i=0;$i<$search->num_rows;$i++){
				// 	$result=$search->fetch_row();
				// 	//0 is JSON, 1 is postal code, 2 is number of cases
				// 	$arr_each=[$result[0],$result[1],$result[2]];
				// 	array_push($output_arr,$arr_each);
				// }

				// for($i=0;$i<count($output_arr);$i++){
				// 	$output.=$output_arr[$i][0];
				// 	$output.=',';
				// }
				// $output_final=rtrim($output,',');
				// $output_final.=']';
				// print_r($output_final);
				// echo json_encode($output_arr);
				// print_r($output_arr);
				break;

			case 1:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT postal_code_map.postal_code,COUNT(theft_report.postal_code) FROM postal_code_map,theft_report WHERE postal_code_map.postal_code='".$code."'AND postal_code_map.postal_code=theft_report.postal_code";
					$result=$database->query($query_1);
					$output=$result->fetch_row();
					// print_r($output);
					echo json_encode($output);
				}
				break;

			case 2:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT theft_report.postal_code,theft_report.report_date,bikes.manufacturer,bikes.model,bikes.type,images.img_link FROM theft_report,bikes,images WHERE theft_report.postal_code='".$code."' AND theft_report.bike_id=bikes.id AND bikes.id=images.bike_id";
					$query_title="SELECT postal_code_map.`postal_code`,COUNT(theft_report.`postal_code`) AS case_num FROM theft_report,postal_code_map WHERE postal_code_map.postal_code='".$code."' AND postal_code_map.postal_code=theft_report.postal_code";
					$result=$database->query($query_1);
					$result_title=$database->query($query_title);
					$output_title=$result_title->fetch_assoc();

					$output_array=[];

					echo '
			            <div class="flex flex-column section-titleBar">
			              <div class="flex flex-row">
			                <h1>'.$output_title['postal_code'].'</h1>
			                <button id="section-close"><img src=""></button>
			              </div>
			              <p>'.$output_title['case_num'].' cases last month
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
					// print_r($output_array);
					// for($i=0;$i<count($output_array);$i++){

					// }
					// echo json_encode($output_array);	
				}
				break;
		}

	}//END if(isset($_GET['request']))//////////////////

              // <div class="flex flex-row section-caseReport">
              //   <img src='img/case1.jpeg'>
              //   <div class="flex flex-column section-case-texts">
              //     <h2>2021 Black Rad Power Bikes Rad Mini 4 Electric Bike</h2>    
              //     <p>reported on 12/10/2022</p>
              //   </div>
              // </div>
?>

