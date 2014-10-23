/**
 * Created by Zem on 2014-10-21.
 */
app.service('SessionService', function(){

    this.get = function(key){
        return JSON.parse(sessionStorage.getItem(key));
    }

    this.set = function(key, data){
        sessionStorage.setItem(key,  JSON.stringify(data));
    }

    this.remove = function(key){
        sessionStorage.removeItem(key);
    }

    this.clear = function(){
        sessionStorage.clear();
    }

    this.getUser = function(){
        return this.get('user');
    }

    this.setUser = function(user){
        this.set('user', user);
    }
});