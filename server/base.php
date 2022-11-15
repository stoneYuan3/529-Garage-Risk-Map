

<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);


	if(isset($_GET['request'])){
		// echo $_GET['request'];
		// if($_GET['request']=0){
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
					// echo $result[1];

					//0 is JSON, 1 is postal code, 2 is number of cases
					$arr_each=[$result[0],$result[1],$result[2]];
					// $res='['.$result[0].']';
					// $arr_each=[$res,$result[1]];

					// print_r($arr_each);	
					// echo'<br>';
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
				
				// echo $_GET['id'];
		}


	}//END if(isset($_GET['request']))//////////////////


			// 	$query_1="SELECT 
			//   JSON_MERGE(
			//     JSON_OBJECT(
			//         'type',type), 
			//     properties) AS data
			// FROM postal_codes_experm_2";
?>