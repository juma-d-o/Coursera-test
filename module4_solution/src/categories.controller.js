(function(){
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesComponentController.$inject=['categories'];
  function CategoriesController(categories) {
      var categoryList =this;
      categoryList.categories =categories;
      console.log(categories);
  }
})()
