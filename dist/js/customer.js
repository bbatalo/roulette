(function(){
var app = angular.module("customerRootModule",['ngRoute','LocalStorageModule','cookieModul','customerDirectives','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

app.config(function($routeProvider){
	$routeProvider

		.when('/home',{
			templateUrl: 'routes/customer/template/home.html',
			controller: 'HomeController',
			controllerAs: 'homeCtrl',
			rolePage: 'musterija'
		})

		.when('/friends',{
			templateUrl: 'routes/customer/template/friends.html',
			controller: 'FriendsController',
			controllerAs:'friendsCtrl',
			rolePage: 'musterija'
		})

		.when('/reservations',{
			templateUrl: 'routes/customer/template/reservations.html',
			controller: 'ReservationsController',
			controllerAs:'reserveCtrl',
			rolePage: 'musterija'
		})

		.when('/settings',{
			templateUrl: 'routes/customer/template/settings.html',
			controller: 'SettingsController',
			controllerAs:'settingsCtrl',
			rolePage: 'musterija'
		})

		.otherwise({
			redirectTo: '/home'
		});
});


app.controller('BodyController',['$window','$http','$scope','localStorageService','$route','$log','RedirectionFactory', function($window,$http,$scope,localStorageService,$route,$log,RedirectionFactory){
	var bodyScope = $scope;

	var rolePage = 'musterija';
	RedirectionFactory.setCurrentPage(rolePage);

	$log.log('usli smo u proveru cookie-a');

    automatizedRedirectioning($window,$http,$scope, localStorageService,RedirectionFactory);
    $scope.user = JSON.parse(localStorageService.get('user'));


    $scope.logout = function(){
    	$http({
    		method:'POST',
    		url:'/autentification/logout',
    		data:$scope.user 
    	});

    	logout($window,$scope, localStorageService);
    };


    $scope.friends = {};
	$scope.friends.notificationsCount = 0;
	$scope.friends.getNotificationsCount = function(refresh){
	    	$http({
	    		method:'POST',
	    		url:"/relationships/getFriendsNotificationsCount/all", 
	    		data:$scope.user
	    	}).then(
	    		function successAnswering(response){
	    			$scope.friends.notificationsCount = response.data;
	    			if(refresh)
	    				$scope.$apply();
	    		}
	    	);
	};
	$scope.friends.getNotificationsCount();


}]);




app.controller('NotificationsController',['$window','$http','$scope','localStorageService','$route','$log', function($window,$http,$scope,localStorageService,$route,$log){

	var notifyScope = $scope;
	// izvucemo username korisnika iz localstorage-a
	// preuzmemo username ne iz scope-a nego iz storage-a = nije asinhrono
	var username = JSON.parse(localStorageService.get('user') ).username; 
	$scope.notifications = [];
	//notifyCtrl.notifications = [];
		// obj1 = {}; obj1.id = 1; obj1.message="HomeController";
		// obj2 = {}; obj2.id = 2; obj2.message="Zdravo svete";
		// obj3 = {}; obj3.id = 3; obj3.message="Hello World";
		// notifyCtrl.notifications.push(obj1);
		// notifyCtrl.notifications.push(obj2);
		// notifyCtrl.notifications.push(obj3);


	$scope.newNotification = function(item){
		$scope.notifications.splice(0,0,item);
		$scope.$apply();
	}



	var stompFriendsEstablished = new SockJS('/stompFriendsEstablishedPanel');
	var topicFriendsEstablished = Stomp.over(stompFriendsEstablished);
	topicFriendsEstablished.connect({}, function(frame) {
		topicFriendsEstablished.subscribe("/topicFriendsEstablishedPanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			var cooperator = notification.destination.username;
			notification.message = cooperator+" accept your friendship request!";
			notification.class = 'alert alert-success alert-dismissible';
			// $scope.notifications.splice(0,0,data); // dodamo ga u listu notifikacija
			// notifyCtrl.notifications = notifyCtrl.notifications.splice(0,0,data); // dodamo ga u listu notifikacija
			notifyScope.$parent.friends.notificationsCount++;
			notifyScope.newNotification(notification);
			// $window.alert(data.content); // javimo poruku

			
		});
	});//connect

	var stompFriendsRequest = new SockJS('/stompFriendsRequestPanel');
	var topicFriendsRequest = Stomp.over(stompFriendsRequest);
	topicFriendsRequest.connect({}, function(frame) {
		topicFriendsRequest.subscribe("/topicFriendsRequestPanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			var cooperator = notification.destination.username;
			notification.message = cooperator+" send you friendship request!";
			notification.class = 'alert alert-success alert-dismissible';
			// $scope.notifications.splice(0,0,data); // dodamo ga u listu notifikacija
			// notifyCtrl.notifications = notifyCtrl.notifications.splice(0,0,data); // dodamo ga u listu notifikacija
			notifyScope.$parent.friends.notificationsCount++;
			notifyScope.newNotification(notification);
			// $window.alert(data.content); // javimo poruku
			

		});

	});//connect

	var stompFriendsNone = new SockJS('/stompFriendsNonePanel');
	var topicFriendsNone = Stomp.over(stompFriendsNone);
	topicFriendsNone.connect({}, function(frame) {
		topicFriendsNone.subscribe("/topicFriendsNonePanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			var cooperator = notification.destination.username;
			notification.message = cooperator+" remove you!";

			//$window.alert(notification.message);

			//notifyScope.$parent.friends.getNotificationsCount(true);
		});

	});//connect
	
	
	var stompReservationsCreatePanel = new SockJS('/stompReservationsCreatePanel');
	var topicReservationsCreatePanel = Stomp.over(stompReservationsCreatePanel);
	topicReservationsCreatePanel.connect({}, function(frame) {
		topicReservationsCreatePanel.subscribe("/topicReservationsCreatePanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			
			var cooperator = notification.organizator.username;
			var restoran = notification.restoran;
			var vreme = new Date(notification.pocetak);
			var vremeStr = vreme.getDate()+" "+(vreme.toDateString()).substr(4,4)+vreme.getFullYear();
			
			notification.message = cooperator+" mada reservation in "+ restoran.naziv +" at: "+vremeStr +" and you are invited.";
			notification.class = 'alert alert-success alert-dismissible';
			notifyScope.newNotification(notification);
			//$window.alert(notification.message);

			//notifyScope.$parent.friends.getNotificationsCount(true);
		});

	});//connect
	
	var stompReservationsDeletePanel = new SockJS('/stompReservationsDeletePanel');
	var topicReservationsDeletePanel = Stomp.over(stompReservationsDeletePanel);
	topicReservationsDeletePanel.connect({}, function(frame) {
		topicReservationsDeletePanel.subscribe("/topicReservationsDeletePanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			
			var cooperator = notification.organizator.username;
			var restoran = notification.restoran;
			var vreme = new Date(notification.pocetak);
			var vremeStr = vreme.getDate()+" "+(vreme.toDateString()).substr(4,4)+vreme.getFullYear();
			
			notification.message = cooperator+" canceled reservation in "+restoran.naziv +" at: "+vremeStr+ " in which you were invited.";
			notification.class = 'alert alert-danger alert-dismissible';
			notifyScope.newNotification(notification);
			//$window.alert(notification.message);

			//notifyScope.$parent.friends.getNotificationsCount(true);
		});

	});//connect
	
	var stompInvitationAcceptPanel = new SockJS('/stompInvitationAcceptPanel');
	var topicInvitationAcceptPanel = Stomp.over(stompInvitationAcceptPanel);
	topicInvitationAcceptPanel.connect({}, function(frame) {
		topicInvitationAcceptPanel.subscribe("/topicInvitationAcceptPanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			
			var cooperator = notification.zvanica.username;
			var restoran = notification.rezervacija.restoran;
			var vreme = new Date(notification.rezervacija.pocetak);
			var vremeStr = vreme.getDate()+" "+(vreme.toDateString()).substr(4,4)+vreme.getFullYear();
						
			notification.message = cooperator+" accepted his invite in "+restoran.naziv+" at: "+vremeStr+".";
			notification.class = 'alert alert-info alert-dismissible';
			notifyScope.newNotification(notification);
			//$window.alert(notification.message);

			//notifyScope.$parent.friends.getNotificationsCount(true);
		});

	});//connect
	
	var stompInvitationCancelPanel = new SockJS('/stompInvitationCancelPanel');
	var topicInvitationCancelPanel = Stomp.over(stompInvitationCancelPanel);
	topicInvitationCancelPanel.connect({}, function(frame) {
		topicInvitationCancelPanel.subscribe("/topicInvitationCancelPanel/"+username, function(data) {
			var notification = JSON.parse(data.body);
			
			var cooperator = notification.zvanica.username;
			var restoran = notification.rezervacija.restoran;
			var vreme = new Date(notification.rezervacija.pocetak);
			var vremeStr = vreme.getDate()+" "+(vreme.toDateString()).substr(4,4)+vreme.getFullYear();
						
			notification.message = cooperator+" canceled his invite in "+restoran.naziv+" at: "+vremeStr+".";
			notification.class = 'alert alert-warning alert-dismissible';
			notifyScope.newNotification(notification);
			//$window.alert(notification.message);

			//notifyScope.$parent.friends.getNotificationsCount(true);
		});

	});//connect


}]);

	
	app.controller('HomeController',['$http','$log','$scope','localStorageService',function($http,$log,$scope,localStorageService){
		//user = $scope.$parent.user;
		
		 $http({
			method:'POST',
			url: 'autentification/login',
			data: $scope.user
		}).then(
			function succesGetBills(response){
				$scope.racuni = response.data.racuni;
				$log.log('ucitani racuni');
			}
		);
		
		$scope.feedbackRacun = function(racun){
			
			$log.log('feedback racun: '+racun.musterija.username);
			$scope.racun = racun;
			$scope.grades = {};
			$scope.grades.ok = false;
			$scope.grades.general = 0;
			$scope.grades.meal = 0;
			$scope.grades.service = 0;
		};
		
	}]); // end


	app.controller('FriendsController',['$http','$log','$scope' ,function($http,$log,$scope){
		$log.log('FriendsController');

		$log.log('F=ja za injecting');


		$scope.friendsRoute = {};
		$scope.friendsRoute.subdirectives = {};
		// $scope.friendsRoute.newRelationSubdirectives = function(newRelation,subdirective,refresh){
		// 	$scope.friendsRoute.subdirectives[subdirective].newRelation(newRelation,refresh);

		$scope.$parent.friends.notificationsCount = 0;
		// };
	}]); // end


	app.controller('ReservationsController',['$http','$log',function($http,$log){
		$log.log('ReservationsController');
	}]); // end


	app.controller('SettingsController',['$http','$log','$scope','localStorageService',function($http,$log,$scope,localStorageService){
		$log.log('SettingsController');
		

		$scope.reset = function(){
			var user = $scope.$parent.user;
			var changer = {};
			changer.password = user.password;
			changer.name = user.name;
			changer.surname = user.surname;
			changer.mail = user.mail;

			$scope.changer = changer;
			$scope.checker = {};
			$scope.checker.password = "";
		};
		$scope.reset(); // inicijalizacija


	$scope.matching = function(){
		$scope.match = $scope.changer.password === $scope.checker.password;
	}


	$scope.applyChanges = function(){
		$scope.changer.id  = $scope.$parent.user.id;
		$scope.changer.username = $scope.$parent.user.username;

		$http({
			method:'POST',
			url:'/autentification/applyChanges',
			data:$scope.changer
		}).then(
			function successChange(response){
				localStorageService.set("user",JSON.stringify(response.data));
				$scope.$parent.user = response.data;
				toaster('success','You successfully updated your profile!');
			},function errorChanges(response){
				toaster('error','Something went wrong');
			}
		);

	}

	}]); // SettingsController





})(); // end, end