/**
 * Created by Zem on 2014-10-21.
 */
app.controller("LoginController", function($scope, $http, $location, SessionService, Facebook){

    $scope.login = function(){
        $http.get('/user/auth', {
            params: {
                token: btoa($scope.username + ':'+$scope.password)
            }
        }).success(function(data){
            console.log(data);
            if(!data.error) {
                SessionService.setUser(data);
                $location.path('/home')
            }
        });
    }

    $scope.createAccount  = function(){
        $http.get('/user/create', {
            params: {
                token: btoa($scope.username + ':'+$scope.password)
            }
        }).success(function(data){
            console.log(data);
            if(!data.error) {
                SessionService.setUser(data);
                $location.path('/home')
            }
        });
    }

    $scope.fblogin = function() {
        // From now on you can use the Facebook service just as Facebook api says
        console.log("run fb login");
        Facebook.login(function(response) {
            // Do something with response.
            console.log(response);
        });
    };

    $scope.getLoginStatus = function() {
        Facebook.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });
    };

    $scope.me = function() {
        Facebook.api('/me', function(response) {
            $scope.user = response;
        });
    };

    $scope.$watch(function() {
        // This is for convenience, to notify if Facebook is loaded and ready to go.
        return Facebook.isReady();
    }, function(newVal) {
        // You might want to use this to disable/show/hide buttons and else
        $scope.facebookReady = true;
    });
});