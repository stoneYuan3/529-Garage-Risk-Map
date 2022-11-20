

<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);


	if(isset($_GET['request'])){

		switch($_GET['request']){
			case 0:
				//JSON_OBJECT() is used to stick non JSON variables together into a JSON object
				//not needed when the data stored is already vaild JSON (in fact it causes issues)
				$query_1="SELECT properties,postal_code,num_of_cases FROM postal_code_map";

				$search=$database->query($query_1);
				$output_arr=[];
				$output='[';
				for($i=0;$i<$search->num_rows;$i++){
					$result=$search->fetch_row();
					//0 is JSON, 1 is postal code, 2 is number of cases
					$arr_each=[$result[0],$result[1],$result[2]];
					array_push($output_arr,$arr_each);
				}

				for($i=0;$i<count($output_arr);$i++){
					$output.=$output_arr[$i][0];
					$output.=',';
				}
				$output_final=rtrim($output,',');
				$output_final.=']';
				// print_r($output_final);
				echo json_encode($output_arr);
				// print_r($output_arr);
				break;

			case 1:
				if(isset($_GET['code'])){
					$code=$_GET['code'];
					$query_1="SELECT postal_code,num_of_cases FROM postal_code_map WHERE postal_code='".$code."'";
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
					
					$result=$database->query($query_1);
					$output_array=[];
					for($i=0;$i<$result->num_rows;$i++){
						$output_each=$result->fetch_assoc();
						// print_r($output_each);
						array_push($output_array,$output_each);
					}
					print_r($output_array);

					// echo json_encode($output_array);	
				}
				break;
		}

	}//END if(isset($_GET['request']))//////////////////
	
            // <div class="flex flex-row section-caseReport">
            //     <div class="img">
            //       <img src='img/image.jpeg'>
            //     </div>
            //     <div class="flex flex-column section-case-texts">
            //       <h2>2021 Black Rad Power Bikes Rad Mini 4 Electric Bike</h2>    
            //       <p>reported on 12/10/2022</p>
            //     </div>
            //   </div>
?>

