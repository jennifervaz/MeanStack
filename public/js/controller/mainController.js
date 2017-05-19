module.exports = function($scope, $http){
  $scope.message = "Hello World";

  var init = function(){
    $http.get('/api/theatres').then(function (response) {
      $scope.theatreData=response.data;
    });
  };
  init();

  $scope.insertTheatre = function(){
    $http.post('/api/newTheatre', $scope.theatre).then(function (response) {
    });
    alert('Theatre Saved Successfully');
    init();
    $scope.theatre='';
    window.location.reload();
  };

  $scope.deleteTheatre = function(theatre){
    var x=confirm("Are you sure you want to delete ?");
    if(x){
      $http.delete('/api/deleteTheatre/'+theatre._id).then(function (response) {
    });
    alert('Theatre Removed Successfully');
  }
  window.location.reload();
    init();
  };


};
