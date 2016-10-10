(function(){
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['itemList'];
  function CategoriesController(itemList) {
      var categoryList =this;
      console.log(itemList);
      categoryList.itemList =itemList;
  }
})()
