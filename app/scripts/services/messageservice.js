'use strict';

angular.module('chattyApp')
  .service('MessageService', function MessageService($http, $q) {
    return {
    	getMessages: function(){
	    	var deferred = $q.defer();
	    	$http({ method: 'GET', url: 'http://localhost:3000/' })
	    		.success(function(data){
	    			deferred.resolve(data);
	    			});
	    	return deferred.promise;
	    },
	    addMessage: function(message){
	    	var formedMessage = { "message": message };
	    	console.log(formedMessage);
	    	$http({
	    		method: 'POST',
	    		url: 'http://localhost:3000/',
	    		data: formedMessage
	    	});
	    }
    }
  });
