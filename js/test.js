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
  var arr=['V6A','V6B'];

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
    result+='<p>';
    result+=data_str;
    result+=',';
    result+='</p>'
    console.log(result);
    $('p').after(result);
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