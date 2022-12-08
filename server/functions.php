<?php
	$dbhost='localhost';
    $dbuser="root";
    $dbpass="";
    $dbname="iat438-individualproject";	

    function db_connect($dbhost,$dbuser,$dbpass,$dbname){
        $connect=mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
        return $connect;
    }
    function db_disconnect($connection){
        if(isset($connection)){
            mysqli_close($connection);
        }
    }

    //generate theft reports list for each postal code section when users click on postal code sections
    function generatePosts($array){
        $output_arr_final=$array;
        for($i=0;$i<count($output_arr_final);$i++){
            $output_each=$output_arr_final[$i];
            if($output_arr_final[$i]['category']==1){
                echo '
                <div class="flex flex-column section-userWorkDisplay-Box">
                <div class="flex flex-row section-uploaderInfo">
                <a href="user-profile.html?userid='.$output_each['user_id'].'" class="flex flex-row flex_center_align_horizontal">
                <img src="uploads/images/'.$output_each['avatar'].'">
                <h4>'.$output_each['user_name'].'</h4>
                </a>
                <p>'.$output_each['upload_time'].'</p>
                </div>
                <div class="flex flex-column section-workdisplay">
                <a href="detail.html?post='.$output_each['post_id'].'">
                <img src="uploads/images/'.$output_each['image_content'].'">
                </a>
                </div>      
                <div class="flex flex-row section-workInteractButtons">
                <button><img src="img/icon-like.svg">'.$output_each['collec_num'].'</button>
                <button><img src="img/icon-comment.svg">'.$output_each['comment_num'].'</button>
                </div>                                      
                </div>                      
                ';
            }
            else{
                echo '
                <div class="flex flex-column section-userWorkDisplay-Box">
                <div class="flex flex-row section-uploaderInfo">
                <a href="user-profile.html?userid='.$output_each['user_id'].'" class="flex flex-row flex_center_align_horizontal">
                <img src="uploads/images/'.$output_each['avatar'].'">
                <h4>'.$output_each['user_name'].'</h4>
                </a>
                <p>'.$output_each['upload_time'].'</p>
                </div>
                <div class="flex flex-column section-workdisplay">
                <a href="detail.html?post='.$output_each['post_id'].'">
                <p>'.$output_each['description'].'</p>
                </a>
                </div>      
                <div class="flex flex-row section-workInteractButtons">
                <button><img src="img/icon-like.svg">'.$output_each['collec_num'].'</button>
                <button><img src="img/icon-comment.svg">'.$output_each['comment_num'].'</button>
                </div>                                      
                </div>                      
                ';                      
            }
        }        
    }




    //functions from other projects that may become useful. not used in the project
    // function page_cssLink($css_name){
    //     $cssLink = "<link rel = \"stylesheet\" href = \"". $css_name . "\">";
    //     echo $cssLink;
    // }

    // //remove/add https
    // function removeHTTPS(){
    //     if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on'){
    //         header('Location:http://'. $_SERVER['HTTP_HOST'] .
    //         $_SERVER['REQUEST_URI']);
    //         exit();
    //     }        
    // }
    // function addHTTPS(){
    //     if($_SERVER['HTTPS']!='on'){
    //         header('Location:https://'. $_SERVER['HTTP_HOST'] .
    //         $_SERVER['REQUEST_URI']);
    //         exit();
    //     }        
    // }    
    ////////////////////

?>