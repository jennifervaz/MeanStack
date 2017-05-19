module.exports = function($scope, $http,$rootScope,$location){
  var init1 = function(){
          $http.get('/api/theatres').then(function (response) {
            $scope.theatreData=response.data;
          });
      };
        init1();

var init=function()
{
  var b=sessionStorage.getItem('movieName');
//   $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+b+'trailer'+'&key=AIzaSyAP779ejfKseunwu7XpDaakUj_9qXkJpRE')
// .then(response => {
// var trailer_id=response.data.items[0].id.videoId;
// console.log("trailer_id"+trailer_id);
// var trailer="https://www.youtube.com/embed/"+trailer_id;
// document.getElementById('player').setAttribute("src",trailer);
// });
$http.get('/myapi/getRating/'+b).then(function(response){
$scope.ratecount=0;
     var count=0;
    var i;
   try
   {
for(i=0;i<=response.data.length;i++)
{count+=parseInt(response.data[i].Rating);}
}
 catch(e){}
 if(count>0)
 {$scope.ratecount=(count/i).toFixed(1);}
 // alert('rating : '+$scope.ratecount);
 document.getElementById("rate").innerHTML=$scope.ratecount;
});
};
  init();

  $scope.rate=function(r)
{
var m_name=sessionStorage.getItem('movieName');
  $http.post('/myapi/rating/'+m_name+'/'+r).then(function(response){

  });
};

  var bookingShow=function(){
var data=sessionStorage.getItem('movieName');
  //var data=$rootScope.movieName;
  $http.get('/mapapi/selmoviename/'+data).then(function(response){
    $scope.booking=response.data;
  });
  $http.get('/myapi/moviePoster/'+data).then(function(response){
   $rootScope.moviedata=response.data;
   sessionStorage.setItem('moviedata',$rootScope.moviedata);
   });

};
bookingShow();

$scope.movDates=[];
var showDates=function() {
for(i=0;i<6;i++)
{
  var date=new Date();
  date.setDate(date.getDate()+i);
  $scope.movDates[i]=date;
  // $scope.movDates[i].toString();
}
};
showDates();

$scope.setShow=function(a,b,c,d)
{
  $rootScope.movieShow=a;
  sessionStorage.setItem('movieShow',$rootScope.movieShow);
  sessionStorage.setItem('movieTheatre',b);
  sessionStorage.setItem('movieDate',c);
  sessionStorage.setItem('movieCity',d);
$location.path("/seats");
};
};
