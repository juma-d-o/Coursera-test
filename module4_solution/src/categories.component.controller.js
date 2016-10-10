(function(){
  angular.module('MenuApp')
  .controller('CategoriesComponentController',CategoriesComponentController);

  CategoriesComponentController.$inject=['categories'];
  function CategoriesComponentController(categories) {
      var categoryList =this;
      categoryList.categories =categories;
      console.log(categories);
  }
})()
