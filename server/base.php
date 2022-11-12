

<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);
// 	$query_1="SELECT 
//   JSON_MERGE(
//     JSON_OBJECT(
//         'type',type), 
//     properties) AS data
// FROM postal_codes_experm_2";
	//JSON_OBJECT() is used to stick non JSON variables together into a JSON object
	//not needed when the data stored is already vaild JSON (in fact it causes issues)
	$query_1="SELECT properties FROM postal_codes_experm_4";

	$search=$database->query($query_1);
	$output_arr=[];
	$output='[';
	for($i=0;$i<$search->num_rows;$i++){
		$result=$search->fetch_row();
		// echo $result[0];
		array_push($output_arr,$result[0]);
	}

	for($i=0;$i<count($output_arr);$i++){
		$output.=$output_arr[$i];
		$output.=',';
	}
	$output_final=rtrim($output,',');
	$output_final.=']';
	echo $output_final;
	// print_r($output_arr);

?>