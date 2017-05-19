module.exports = function($scope, $http){
    $scope.RegisterUser = function() {
        $http.post('/user/signup', $scope.User).then(function(response) {
            alert('User Registration Successful');
        });
    }
}
