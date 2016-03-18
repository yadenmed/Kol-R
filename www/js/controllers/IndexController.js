(function(){
	angular.module('starter')
	.controller('IndexController', ['localStorageService', '$scope', '$state','$ionicPopup','$cordovaNetwork', IndexController]);
	
	function IndexController(localStorageService, $scope, $state,$ionicPopup,$cordovaNetwork){
		$scope.username = localStorageService.get('username');
		
		// if(navigator.onLine)
		// {
			// if($scope.username)
				// $state.go('app');
		// }
		

		$scope.login = function(){
			if(navigator.onLine){
				var username = $scope.username;
				localStorageService.set('username', username);
				$state.go('app');
			}
			else{
				$ionicPopup.alert({
				   title: 'Error',
				   template: 'Internet Unavailable !'
				 });
			}

		};

	}

})();