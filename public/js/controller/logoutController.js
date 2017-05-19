module.exports = function($scope, $http, $location,$rootScope) {



    $scope.logout = function() {
        $http.get('/user/logout').then(function(response) {
            alert('User logout Successful');
            $location.url('/login');
              $rootScope.islogin = 'false';
              window.location.reload(false);
        });
      window.location.reload(false);
        console.log('Logout Attempted'+$rootScope.islogin);
    }
}
