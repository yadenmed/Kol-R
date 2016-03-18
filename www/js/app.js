// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'LocalStorageModule','ngCordova'])

.run(function($ionicPlatform,$cordovaNetwork,$ionicPopup,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(!navigator.onLine){
       $ionicPopup.alert({
          title: 'Error',
          template: 'Internet Unavailable !'
        });
    }
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      $ionicPopup.alert({
         title: 'Error',
         template: 'Internet Unavailable !</br> Connect your device to internet and try again ...'
       });
    })

  });
})

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/index.html'
    })

    .state('app', {
      url: '/app',
      templateUrl: 'templates/videocall.html'
    });

    $urlRouterProvider.otherwise('/login');
});
