<?php
	require_once('functions.php');
	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);
	if(isset($_GET['query'])){
		if($_GET['query']=='report'){
			$arr_bikeDetail=$_POST['bikeDetail'];
			$arr_bikeImg=$_FILES['bikeImg'];
			$arr_theftReport=$_POST['theftReport'];
			echo json_encode($arr_bikeDetail);
		}
	}
?>
