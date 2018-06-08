angular.module("autentificationModule").controller("loginController",['$window','$scope','$http','localStorageService','RedirectionFactory','ModalsFactory','$log',function($window,$scope,$http,localStorageService, RedirectionFactory, ModalsFactory,$log){
"use strict";

	this.logging = function(){

		var ctrl = this;

		/*cookie = localStorageService.get("user");
		$window.alert(cookie);*/

		$http({
			method:'POST',
			url: 'autentification/login',
			data: $scope.logger
		}).then(
			function successCallback(response) {
			    // $scope.status = response.status;
          		// $scope.data = response.data;

				//ctrl.modal('Succeed', "redirection");
				localStorageService.set("user",JSON.stringify(response.data));


				var path = RedirectionFactory.getRedirectionPath(response.data.role);
				if(path!='X')
					$window.location.href = path;



			}, function errorCallback(response) {
			    //$window.alert( "status je: " + response.status + "data je: " + response.data + "objekat je: " + response);
			    //!!!!!!!!!!!!!!!!   ctrl.modal('Error',"There is no such user");
			    ModalsFactory.toaster('error','There is no such user');
		});
	};
	
}]);





angular.module("autentificationModule").controller('FirstChangeController',['$window','$http','$scope','localStorageService',function($window,$http,$scope,localStorageService){
	this.matching = function(){
		$scope.match = $scope.changer.password1 === $scope.changer.password2;
	}

	this.change = function(){
		//$window.alert($scope.register.username +": "+$scope.register.password+", "+$scope.register.mail );
		ctrl = this;

		cookie = localStorageService.get("first");
		obj = JSON.parse(cookie);
		obj.password = $scope.changer.password1;

		$http({
			method:'POST',
			url: 'autentification/firstChangeProducer',
			data: obj
		}).then(
			function successCallback(response) {
			    $scope.status = response.status;
          		$scope.data = response.data;

          		if( response.status < 300){
          			// ctrl.modal('Succeed!',"You changed your password");
          			localStorageService.set("user", JSON.stringify(response.data) );
          			localStorageService.remove("first");
          			$window.location.href = 'customer.html';
          		}else{
          			// ctrl.modal('Error', "Either is password alredy changed, either we can't find user with this username.");
          			localStorageService.remove("user");
          			localStorageService.remove("first");
          			$window.location.href = 'login2.html#/main';
          		}

          		


			}, function errorCallback(response) {
			    //$window.alert( "status je: " + response.status + "data je: " + response.data + "objekat je: " + response);
			    //!!!!!!!!!!!!!!!!!!  ctrl.modal('Error','Something went wrong.');
			    toaster('error','Something went wrong.');
		});

	}	



	this.modal = function (title,data) {
    
	    $scope.modal = {};
	    $scope.modal.title = title;
	    $scope.modal.data = data;
	    $('#firstChangePanel #autentificationInfo').modal('show');
	};


}]);