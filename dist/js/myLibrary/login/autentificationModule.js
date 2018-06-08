(function(){
var app = angular.module("autentificationModule",['ngRoute','LocalStorageModule','cookieModule','modalsLibraryModule']);

app.directive('loginForm',function(){
	return{
		restrict:'E',
		templateUrl:'directives/myLibrary/login/template/mainLogin.html'
	};
});

app.directive('registrationForm',function(){
	return{
		restrict:'E',
		templateUrl:'directives/myLibrary/login/template/mainRegistration.html'
	};
});


})();