(function(){
  'use strict';
  angular.module('MenuApp')
  .config(RoutesConfig);
  RoutesConfig.$inject=['$stateProvider','$urlRouterProvider'];
  function RoutesConfig($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home',{
      url: '/home',
      templateUrl:'src/home.html'
    })

   .state('categories',{
     url: '/categories',
     templateUrl: 'src/categories.html'
   })

   .state('items',{
     url:'/items',
     templateUrl: 'src/items.html'
   })

  }



})()
