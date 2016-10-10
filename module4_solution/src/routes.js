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
     templateUrl: 'src/categories.html',
     controller: 'CategoriesController as categoryList',
     resolve : {
       items : ['MenuDataService',function(MenuDataService){
         return   MenuDataService.getAllCategories().then(function(results){
           return results;
         });
       }]
     }
   })

   .state('items',{
     url:'/items/{categoryShortName}',
     templateUrl: 'src/items.html',
     controller:'ItemsController as itemList',
     menuItems: ['$stateParams','MenuDataService',
         function($stateParams,MenuDataService){
           return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
         }]
   })

  }



})()
