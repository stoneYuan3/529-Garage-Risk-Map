

<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);
	$query_1="SELECT 
  JSON_MERGE(
    JSON_OBJECT(
        'type',type), 
    properties) AS data
FROM postal_codes_experm_2";

	$search=$database->query($query_1);
	for($i=0;$i<$search->num_rows;$i++){
		$result=$search->fetch_row();
		echo $result[0];
	}

?>