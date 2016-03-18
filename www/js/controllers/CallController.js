(function(){
	angular.module('starter')
	.controller('CallController', ['localStorageService', '$scope', '$ionicPopup','$ionicLoading', CallController]);
	
	function CallController(localStorageService, $scope, $ionicPopup,$ionicLoading){

			$scope.username = localStorageService.get('username');
			$scope.currentCall = false;


			var peer = new Peer($scope.username, {
				key: 'dhcycgs877t4kj4i',
				config: {'iceServers': [
		            { url: 'stun:stun1.l.google.com:19302' },
		            { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
        		]}
			});
			// var peer = new Peer($scope.username, {
			//         host: '127.0.0.1', port: 3000, path: '/peerjs',
			//         config: {'iceServers': [
			//             { url: 'stun:stun1.l.google.com:19302' },
			//             { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
			//         ]}
			//     }
			// );

			function getVideo(successCallback, errorCallback){
				navigator.getUserMedia = ( navigator.getUserMedia ||
				                       navigator.webkitGetUserMedia ||
				                       navigator.mozGetUserMedia ||
				                       navigator.msGetUserMedia);
			    navigator.getUserMedia({audio: true, video: true}, successCallback, errorCallback);
			}


			function onReceiveCall(call){
				$scope.currentCall = call;
				$ionicPopup.confirm({
					title: 'Incoming Call',
					template: call.peer+'is calling you. '
				})
				.then(function(res) {
				     if(res) {
				           getVideo(
				               function(MediaStream){
				               		
				                   call.answer(MediaStream);
				                   var video = document.getElementById('local-video');
				                   video.src = window.URL.createObjectURL(MediaStream);
				               },
				               function(err){
				               
				                   $ionicPopup.alert({
				       	        	title: 'Error',
				       	        	template: 'An error occured while try to connect to the device mic and camera'
				       	        });
				               }
				           );
				     } else {
				       call.close();
				     }
				   });

			    call.on('stream', onReceiveStream);
			}


			function onReceiveStream(stream){
				$ionicLoading.hide();
			    var video = document.getElementById('contact-video');
			    video.src = window.URL.createObjectURL(stream);
			    video.onloadedmetadata = function(){
					// $ionicPopup.alert({
					// 	title: 'Call Ongoing',
					// 	template: 'Call has started. You can speak now'
					// });
			    };

			}
			$scope.endCall = function(){
				$scope.currentCall.stop();
				$scope.currentCall = null;
			}
			$scope.startCall = function(){
				var contact_username = $scope.contact_username;
		
				getVideo(
				    function(MediaStream){

				        var call = peer.call(contact_username, MediaStream);
				        $scope.currentCall = call;
				       	var video = document.getElementById('local-video');
				       	video.src = window.URL.createObjectURL(MediaStream);
				        	    
				        $ionicLoading.show({
				             template: 'In progress...'
				           });

				        call.on('stream', onReceiveStream);
				        call.on('close',function(){
				        $scope.currentCall = null;
				        $ionicPopup.alert({
				        	title: 'Call Ended',
				        	template: 'Your call was ended !'
				        });
				    });
				    },
				    function(err){
				        $ionicPopup.alert({
				        	title: 'Error',
				        	template: 'An error occured while try to connect to the device mic and camera'
				        });
				    }
				);

			};

			peer.on('call', onReceiveCall);



	}

})();
