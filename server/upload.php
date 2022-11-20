<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);

?>




<form method="post">
	<h1>submit bike</h1>
	<label for="serial">serial number</label>
	<input type="text" name="serial">
	<br>

	<label for="nickname">nickname</label>
	<input type="text" name="nickname">
	<br>

	<label for="manufacturer">manufacturer</label>
	<input type="text" name="manufacturer">
	<br>

	<label for="model">model</label>
	<input type="text" name="model">
	<br>

	<label for="value">value</label>
	<input type="text" name="value">
	<br>

	<label for="type">type</label>
	<input type="text" name="type">
	<br>

	<label for="isStolen">is it stolen?</label>
	<input type="checkbox" name="isStolen">
	<br>

	<label for="where">where it is stolen</label>
	<input type="text" name="where">
	<br>

	<input type="submit" value="Submit" name="submit">

</form>

<?php

	if(isset($_POST['submit'])){
		$serial=$_POST['serial'];
		$nickname=$_POST['nickname'];
		$manufacturer=$_POST['manufacturer'];
		$model=$_POST['model'];
		$value=$_POST['value'];
		$type=$_POST['type'];

		$input_arr=[$serial,$nickname,$manufacturer,$model,$value,$type];

		$query="INSERT INTO bikes(`serial_number`,`nickname`,`manufacturer`,`model`,`value`,`type`)";
		$query_fill=" VALUES(";
		for($i=0;$i<count($input_arr);$i++){
			if(empty($input_arr[$i])){
				$query_fill.="NULL,";
			}
			else{
				$query_fill.="'".$input_arr[$i]."',";
			}
		}
		$query_fill=rtrim($query_fill,',');
		$query_fill.=')';
		$query.=$query_fill;
		echo $query;

		echo $_POST['manufacturer'];

		if(isset($_POST['isStolen'])){
			echo '<br>';
			$query_2="INSERT INTO thefr_report(`bike_id`,`report_date`,`postal_code`,`description`)";
		}
		// print_r(!empty($_POST['manufacturer']));
		// $query_insert="INSERT INTO bikes()";
	}	

?>