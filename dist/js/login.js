var log = angular.module("loginModule",[]);

log.controller("loginController",['$window','$scope','$http',function($window,$scope,$http){

	this.logging = function(){
		$window.alert($scope.logger.username +": "+$scope.logger.password );
	};
	
}]);

log.controller("registerController",['$window','$scope','$http',function($window,$scope,$http){

	this.registration = function(){
		$window.alert($scope.register.username +": "+$scope.register.password+", "+$scope.register.mail );
	};
	
}]);

/*
log.config(function($routeProvider){
	$routeProvider

		.when('/login',{
			
		})

		.when('/verification',{
			templateUrl: ''
		})

		.otherwise({
			redirectTo: '/login'
		});
});*/