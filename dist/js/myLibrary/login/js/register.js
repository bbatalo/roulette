angular.module("autentificationModule").controller("registerController",['$window','$scope','$http','localStorageService',function($window,$scope,$http,localStorageService){

	
	
	this.matching = function(){
		$scope.match = $scope.register.password === $scope.checker.password;
	}

	this.registration = function(){
		//$window.alert($scope.register.username +": "+$scope.register.password+", "+$scope.register.mail );
		ctrl = this;

		cookie = localStorageService.get("user");
		//$window.alert(cookie);

		$http({
			method:'POST',
			url: 'autentification/register',
			data: $scope.register
		}).then(
		/*
			function mySuccess(success){
				$scope.status = success.status;
          		$scope.data = success.data;

          		if(angular.equals($scope.data,"OK") )
          			$window.alert("Verification link is send to your email. Click it!");
          		else
          			$window.alert( $scope.data );
			},function myError(errorr){
				$window.alert( "status je: " + errorr.status);
				$window.alert( "data je: " + errorr.data);
			}*/
			function successCallback(response) {
			    $scope.status = response.status;
          		$scope.data = response.data;

          		if(angular.equals($scope.data,"OK") ){
          			//$window.alert("Verification link is send to your email. Click it!");
          			//!!!!!!!!!!!! ctrl.modal('Succeed!',"Verification link is send to your email. Click it!");
          			toaster('success','Verification link is send to your email. Click it!');
          		}else{
          			//!!!!!!!!!!!! ctrl.modal('Error', response.data);
          			toaster('error',response.data);
          		}

          		


			}, function errorCallback(response) {
			    //$window.alert( "status je: " + response.status + "data je: " + response.data + "objekat je: " + response);
			    //!!!!!!!!!!!! ctrl.modal('Error','Something went wrong.');
			    toaster('error','Something went wrong.');
		});

	}	



	this.modal = function (title,data) {
    
	    $scope.modal = {};
	    $scope.modal.title = title;
	    $scope.modal.data = data;
	    $('#registerPanel #autentificationInfo').modal('show');
	};
				
	
}]);




angular.module("autentificationModule").controller('Verification',['$window','$http','$scope','$routeParams','localStorageService','$route',function($window,$http,$scope,$routeParams,localStorageService){
	$scope.report = "Waiting.....";
	$scope.pass = false;
	//$window.alert("Verify at: "+$routeParams.username + ", " + $routeParams.code);
	
	ctrl = this;
	$http({method:"GET",
		url:'autentification/verification/'+$routeParams.username+"/"+$routeParams.code
	}).then(
		function success(response){
			$scope.report = "Your account is verified";
			$scope.pass = true;
			// $cookies.user = response.data;
			//$cookies.put("user",response.data);
			localStorageService.set("user",JSON.stringify(response.data));
			localStorageService.remove("first");
		},
		function error(response){
			$scope.report = "Verification denied!";
			$scope.pass = false;
			localStorageService.remove("first");
			localStorageService.remove("user");
		}
	);
}]); 



/*
angular.module("autentificationModule").controller("modalController",['$window','$scope','$http','$uibModalInstance',function($window,$scope,$http,$uibModalInstance){

	this.ok = function () {
		$uibModalInstance.close('ok');
		$window.alert('rekao sam ok');
	};

	this.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	    $window.alert('rekao sam cancel');
	};
}]);
*/
/*
angular.module("autentificationModule").controller("modalController",['$window','$scope','$http',function($window,$scope,$http){

	this.ok = function () {
		
		$window.alert('rekao sam ok');
	};

	this.cancel = function () {
	    
	    $window.alert('rekao sam cancel');
	};
}]);
*/