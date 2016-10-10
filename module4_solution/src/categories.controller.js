(function(){
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['items'];
  function CategoriesController(items) {
      var categoryList =this;
      console.log(items);
      categoryList.items =items;
  }
})()
