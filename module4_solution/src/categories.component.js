(function(){
  'use strict';
  angular.module('MenuApp')
  .component('categories',{
    templateUrl: 'src/categories.html',
    controller:CategoriesComponentController,
    resolve : {
      categories : ['MenuDataService',function(MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  });

  CategoriesComponentController.$inject=['categories'];
  function CategoriesComponentController(categories){
    var $ctrl =this;
    $ctrl.categories =categories;
    console.log(categories);
  }

})()
