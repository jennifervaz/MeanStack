module.exports = function($scope, $http,$rootScope,$location)
{
  var init = function(){
      $http.get('/conapi/feedback').then(function (response) {
        $scope.feedbackData=response.data;
      });
    };
    init();

    $scope.deleteFeedback = function(feedback){
      var x=confirm("Are you sure you want to delete ?");
      if(x){
        $http.delete('/conapi/deleteFeedback/'+feedback._id).then(function (response) {
      });
        window.location.reload();
    }
      init();
    };
};
