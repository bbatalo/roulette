(function(){
var log = angular.module("loginModule",['ngRoute','autentificationModule']);
/*
log.controller("loginController",['$window','$scope','$http',function($window,$scope,$http){

	this.logging = function(){
		$window.alert($scope.logger.username +": "+$scope.logger.password );
	};
	
}]);
*/
/*
log.controller("registerController",['$window','$scope','$http',function($window,$scope,$http){

	this.registration = function(){
		$window.alert($scope.register.username +": "+$scope.register.password+", "+$scope.register.mail );
	};
	
}]);
*/
/*
log.directive('loginForm',function(){
	return{
		restrict:'E',
		templateUrl:'directives/login/template/mainLogin.html'
	};
});

log.directive('registrationForm',function(){
	return{
		restrict:'E',
		templateUrl:'directives/login/template/mainRegistration.html'
	};
});
*/
log.config(function($routeProvider){
	$routeProvider

		.when('/main',{
			templateUrl: 'routes/login/template/main.html',
			controller: 'CheckCookie',
			controllerAs: 'ccookie',
			rolePage: 'none'
		})

		.when('/verification/:username/:code',{
			templateUrl: 'routes/login/template/verification.html',
			controller: 'Verification',
			controllerAs:'verify'
		})

		.when('/firstChange',{
			templateUrl: 'routes/login/template/firstChange.html'
		})

		.otherwise({
			redirectTo: '/main'
		});
});


})();