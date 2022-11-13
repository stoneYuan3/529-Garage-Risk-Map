
<?php
	require_once('functions.php');

	$database=db_connect($dbhost,$dbuser,$dbpass,$dbname);

	// $query_insert="INSERT imglink_test(imglink) VALUE('../img/image.jpeg')";
	// $result=$database->query($query_insert);
	// if($result){
	// 	echo 'successful';
	// }

	$query_retrieve="SELECT imglink FROM imglink_test";
	$output=$database->query($query_retrieve);
	// print_r($result)
	// print_r($output->fetch_row());
	$result=$output->fetch_row();
	echo '<img src="'. $result[0] .'">';

	// echo '<form method="post">';
	echo '<form method="post" enctype="multipart/form-data">';
		echo '<input type="file" name="imgupload" id="imgupload" value=""/>';
		echo '<br>';
		echo '<input type="submit" value="Submit" name="submit">';
		echo '<br>';
	echo '</form>';
	

	if(isset($_POST['submit'])){
		// if(!empty($_POST['imgupload'])){
			// print_r($_POST['imgupload']);
			$file_name=$_FILES["imgupload"]["name"];
			$file_tempLink=$_FILES["imgupload"]["tmp_name"];
			// print_r($file_name);
			echo $file_name;

			if(move_uploaded_file($file_tempLink, "../img/".$file_name)){
				echo '<br>yee';
			}else{
				echo '<br>fuck';
			}
		}
	// }

?>