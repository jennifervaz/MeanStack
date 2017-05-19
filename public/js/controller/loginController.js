module.exports = function($scope, $http,$location,$rootScope) {
    $scope.LoginUser = function() {
        $http.post('/user/login', $scope.User).then(function(response) {
            alert('User login Successful');
            $rootScope.islogin='true';
        });
        console.log('Login Attempted'+$rootScope.islogin);
    }
}
