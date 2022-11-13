

<?php
	$dbhost='localhost';
    $dbuser="root";
    $dbpass="";
    // $dbname="geodatatest";
    $dbname="iat438-individualproject";	
?>

<?php
    function db_connect($dbhost,$dbuser,$dbpass,$dbname){
        $connect=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
        return $connect;
    }
    function db_disconnect($connection){
        if(isset($connection)){
            mysqli_close($connection);
        }
    }
?>

<?php
//check if an item exists in a watchlist
function checkWatchlist($db, $product_code, $session){
    $noDuplicate=false;
    $query_checkWatchlist = "SELECT userid, productCode FROM watchlist WHERE userid='".$session."' AND productCode='".$product_code."'";
    $result_checkWatchlist=$db->query($query_checkWatchlist);
    if($result_checkWatchlist->num_rows==0){
        $noDuplicate=true;
    }    
    return $noDuplicate;
}

?>




<?php
    function page_cssLink($css_name){
        $cssLink = "<link rel = \"stylesheet\" href = \"". $css_name . "\">";
        echo $cssLink;
    }

    //remove/add https
    function removeHTTPS(){
        if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on'){
            header('Location:http://'. $_SERVER['HTTP_HOST'] .
            $_SERVER['REQUEST_URI']);
            exit();
        }        
    }
    function addHTTPS(){
        if($_SERVER['HTTPS']!='on'){
            header('Location:https://'. $_SERVER['HTTP_HOST'] .
            $_SERVER['REQUEST_URI']);
            exit();
        }        
    }    
    ////////////////////

    function create_header(){
        session_start();
        echo'
            <html lang="en">
              <head>
                <title>IAT352-A3</title>
              </head>
        ';
    }

    function create_nav(){

    	echo '	
	    <header>
			<nav class="flex">
				<div class="flex flex-row">
					<a href="index.php">Classic Models</a>
					<a href="showmodels.php">All Models</a>
					<a href="watchlist.php">Watchlist</a>
				</div>
				<div class="flex flex-row">';
                //check whether display login or logout
                if(isset($_SESSION['user'])){
				    echo '<p>Hello, ' . $_SESSION['user'] . '</p>';
                    echo '<a href="logout.php">Log out</a>'	;
                }
                else{
                    echo '<a href="login.php">Log in</a>';
                }

		echo '	</div>
			</nav>
		</header>
		';
        removeHTTPS();
    }
    function create_nav_login(){
        echo '  
        <header>
            <nav class="flex">
                <div class="flex flex-row">
                    <a href="index.php">Classic Models</a>
                    <a href="showmodels.php">All Models</a>
                    <a href="watchlist.php">Watchlist</a>
                </div>

            </nav>
        </header>
        ';
        addHTTPS();       
    }
?>
