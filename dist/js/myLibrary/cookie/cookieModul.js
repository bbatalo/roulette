(function(){
	'use strict';
var app = angular.module("cookieModul",['ngRoute','LocalStorageModule']);
	
	
	app.factory('RedirectionFactory',['$log','$window','$http', 'localStorageService', function($log,$window,$http, localStorageService){
		var factory = {};
		
		factory.service = localStorageService;
		
		factory.getKey = function(){
			return  localStorageService.get('pkey');
		}
		factory.setKey = function(pkey){
			localStorageService.set('pkey',pkey);
		}
		factory.clear = function(){
			localStorageService.clearAll();
		}
		return factory;
	}]);



})();