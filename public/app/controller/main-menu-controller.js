/**
 * Created by Zem on 2014-10-21.
 */
app.controller("MenuController", function($scope, SessionService){

    $scope.isLoggedIn = function(){
        var user = SessionService.getUser();
        if(user){
            $scope.user = user;
            return true;
        }
        return false;
    }
});