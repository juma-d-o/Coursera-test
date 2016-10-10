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
     templateUrl: 'src/main-category-list.html',
     controller: 'CategoriesController as categoryList',
     resolve : {
       categories : ['MenuDataService',function(MenuDataService){
         return   MenuDataService.getAllCategories();
       }]
     }
   })

   .state('categories.items',{
     url:'/items/{categoryShortName}',
     templateUrl: 'src/item-list.html',
     controller:'ItemsController as itemList',
     resolve: {
       items: ['$stateParams','MenuDataService',
           function($stateParams,MenuDataService){
             return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
           }]
     }
   })
  }



})()
