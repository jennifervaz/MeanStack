'use strict';


var angular = require('angular');
require('angular-route');

var app = angular.module('theatreApp', ['ngRoute','angular.filter']);



require('./controller');
require('./service');

app.config(function($routeProvider, $locationProvider){
  $locationProvider.hashPrefix('')
  $routeProvider.when('/',{
    templateUrl: 'views/Home.html',
    controller: 'MovieController',

    // access: {restricted: false}
  }).when('/theatre',{
    templateUrl: 'views/theatre.html',
    controller: 'MainController',
    resolve: {
            logincheck: checkLoggedIn1
            }

  }).when('/movie',{
    templateUrl: 'views/movie.html',
   controller: 'MovieController',
   resolve: {
           logincheck: checkLoggedIn2
           }
 }).when('/mapping',{
   templateUrl: 'views/mapping.html',
  controller: 'MappingController',
  resolve: {
          logincheck: checkLoggedIn3
          }
}).when('/booking',{
    templateUrl: 'views/BookingShow.html',
   controller: 'BookingController',

  }).when('/seats',{
    templateUrl: 'views/BookingSeats.html',
   controller: 'SeatsController',

 }).when('/payment',{
   templateUrl: 'views/payment.html',
  controller: 'PaymentController',

}).when('/confirm',{
  templateUrl: 'views/ConfirmPage.html',
 controller: 'ConfirmController',

}).when('/feedback',{
  templateUrl: 'views/Feedback.html',
 controller: 'FeedbackController',

}).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',

    }).when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegisterController',

    }).when('/logout', {
      controller: 'LogoutController',

    }).when('/rating', {
      templateUrl: 'views/rating.html',
      controller: 'BookingController',

    });
});

var checkLoggedIn1 = function($q, $http, $location, $rootScope) {
    var deferred = $q.defer();
    $rootScope.islogin ='';
    $http.get('/user/loggedin').then(function(user) {
        if (user.data != '0') {
            $rootScope.currentUser = user.data;
            $rootScope.islogin = 'true';
            deferred.resolve();
              $location.url('/theatre');

            console.log('User Logged in'+$rootScope.islogin);

        } else {
            deferred.reject();
            $location.url('/login');
            $rootScope.islogin = 'false';
            console.log('User is not logged in');
            window.location.reload(false);
    }
    });
    return deferred.promise;
}

    var checkLoggedIn2 = function($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        $rootScope.islogin ='';
        $http.get('/user/loggedin').then(function(user)
    {
            if (user.data != '0')
            {
                $rootScope.currentUser = user.data;
                $rootScope.islogin = 'true';
                deferred.resolve();
                  $location.url('/movie');

                console.log('User Logged in'+$rootScope.islogin);

            }
            else
            {
                deferred.reject();
                $location.url('/login');
                $rootScope.islogin = 'false';
                console.log('User is not logged in');
                  window.location.reload(false);
            }
      });
      return deferred.promise;
    }

        var checkLoggedIn3 = function($q, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $rootScope.islogin ='';
            $http.get('/user/loggedin').then(function(user) {
                if (user.data != '0') {
                    $rootScope.currentUser = user.data;
                    $rootScope.islogin = 'true';
                    deferred.resolve();
                      $location.url('/mapping');

                    console.log('User Logged in'+$rootScope.islogin);

                } else {
                    deferred.reject();
                    $location.url('/login');
                    $rootScope.islogin = 'false';
                    console.log('User is not logged in');
                      window.location.reload(false);
                }
            });



    return deferred.promise;
}
