// const settings = {
//   "async": true,
//   "crossDomain": true,
//   "url": "https://vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com/rest/v1/public/boundary/ca/fsa?postal-fsa=V6A",
//   "method": "GET",
//   "headers": {
//     "X-RapidAPI-Key": "c550eaff96msh69437ba4af08c42p1a785djsn67b8464f3905",
//     "X-RapidAPI-Host": "vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com"
//   }
// };

// $.ajax(settings).done(function (response) {

//   var arr=['V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6Z'];
//   var code='';

//   for(let i=0;i<arr.length;i++){
//     code=arr[i];
//     var link='https://vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com/rest/v1/public/boundary/ca/fsa?postal-fsa=';
//     link+=code;
//     url: link
//   }

//   console.log(response);
// });

//VERIFIED working///////////////////////////////////////////////
//can pull postal code boundaries as JSON objects from the given link
//based on https://rapidapi.com/VanitySoft/api/ca-boundaries-io JQuery
//50 pull per day limit for free trail

  // var arr=['V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6Z'];
  //vancouver
  //var arr=['V5K','V5L','V5M','V5N','V5P','V5R','V5S','V5T','V5V','V5W','V5X','V5Y','V5Z','V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6Z'];
  
  //burnaby
  // var arr=['V3J','V3N','V4H','V4J','V5A','V5B','V5C','V5E','V5G','V5H','V5J'];
  
  // //richmond
  // var arr=['V7B','V6V','V7E','V6Y','V7A','V7C','V6X','V6W'];

  //surrey
  // var arr=['V3S','V3T','V3X','V3R','V4N','V3V','V4P','V4A','V3W'];

  //New Westminster
  // var arr=['V3M','V3L'];

  //Port Coquitlam
  // var arr=['V3B','V3E','V3C'];

  //Coquitlam,Port Moody
  // var arr=['V3J','V3K','V3H'];

  //Delta
  var arr=['V4K','V4C','V4E','V4L','V4G','V4M'];

  var code='';


var result_arr=[];

for(let i=0;i<arr.length;i++){
    code=arr[i];
    var link='https://vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com/rest/v1/public/boundary/ca/fsa?postal-fsa=';
    link+=code;

$.ajax({
  "async": true,
  "crossDomain": true,
  // "url": "https://vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com/rest/v1/public/boundary/ca/fsa?postal-fsa=V6A",
  "url":link,
  "method": "GET",
  "headers": {
    "X-RapidAPI-Key": "c550eaff96msh69437ba4af08c42p1a785djsn67b8464f3905",
    "X-RapidAPI-Host": "vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com"
  },
  dataType:'json',
  success:function(data){
    var result='';
    console.log(data);
    data_str=JSON.stringify(data);
    // result+='<p>';
    result+=data_str;
    result+=',';
    // result+='</p>'
    console.log(result);
    // $('p').after(result);
    $('p').append(result);
  }
});

}

///////////////////////////////////////////////////////////////////////

// var arr=['V6A','V6B','V6C','V6E','V6G','V6H','V6J','V6L','V6M','V6N','V6P','V6R','V6S','V6T','V6Z'];
// var code='';

// for(let i=0;i<arr.length;i++){
//   code=arr[i];
//   var link='https://vanitysoft-canada-postal-boundaries-v1.p.rapidapi.com/rest/v1/public/boundary/ca/fsa?postal-fsa=';
//   link+=code;  

//   $.ajax(settings).done(function (response) { 
//       url: link
//     console.log(response);
//     console.log(link);
//   });
// }