module.exports = function($scope, $http,$rootScope,$location,$q,AuthService){
  $scope.movieData='';
$scope.name='';
$scope.year='';

var init = function(){
    $http.get('/myapi/movie').then(function (response) {
      $scope.movieData1=response.data;
    });
  };
  init();

  $scope.deleteMovie = function(movie)
  {
    var x=confirm("Are you sure you want to delete ?");
    if(x)
    {
      $http.get('/mapapi/selmoviename/'+movie.Title).then(function (response)
      {
        $scope.data=response.data;
        console.log($scope.data);

    if($scope.data.length>=1)
    {
      console.log('Delete movie section for if.');
      alert('ERROR : Mapping exists for the movie,cannot delete.');
    }
    else
    {
      console.log('Delete movie section for else.');
      $http.delete('/myapi/deleteMovie/'+movie.Title).then(function (response) {  });
      alert('Movie deleted Successfully');
    }
    });
//   $http.delete('/myapi/deleteRating/'+movie.Title).success(function (response) {
// });
      window.location.reload();
  }
    init();
  };

  $scope.searchMovie = function(){
    $http.get('http://www.omdbapi.com/?t='+$scope.name+'&y='+$scope.year+'&plot=short&r=json').then(function (response) {
      $scope.movieData=response.data;
      console.log(response.data);
      
  if(!$scope.movieData)
  alert('ERROR : No movie found .');

});
init();
  };
  init();

$scope.setMovie=function(m)
{
  //$rootScope.movieName=m;
  sessionStorage.setItem('movieName',m);
$location.path("/booking");
};


$scope.rateMovie=function(m)
{
  //$rootScope.movieName=m;
  sessionStorage.setItem('movieName',m);
$location.path("/rating");
};


  $scope.addMovie = function(){

$http.get('/myapi/movieExist/'+ $scope.movieData.imdbID).then(function (response) {

  var currCount = response.data.length;
  //console.log();
  console.log(currCount);
  if( currCount == 0 )
  {
     $http.post('/myapi/newMovie', $scope.movieData).then(function (response) {
     });
     alert('Movie Saved Successfully');
    window.location.reload();
    init();
   $scope.movieData='';
  }
  else
  {
    alert('Movie Already Exists');
    window.location.reload();
    init();
   $scope.movieData='';
  }

});
};
};
