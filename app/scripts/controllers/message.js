'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {
    $scope.messages = MessageService.getMessages().then(function(data){
    	$scope.messages = data;
    	console.log(data);
    });

    $scope.addMessage = function(){
    	MessageService.addMessage($scope.userMessage).then(function(data){
    		$scope.messages = data;
    		$scope.userMessage = '';
    	})
    };
	});