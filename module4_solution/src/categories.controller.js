(function(){
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['categories'];
  function CategoriesController(items) {
      var categoryList =this;
      categoryList.items =items;
      console.log(categories);
  }
})()
