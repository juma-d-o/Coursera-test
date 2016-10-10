(function(){
  angular.module('MenuApp')
  .controller('ItemsController',ItemsController);

  ItemsController.$inject=['menuItems'];
  function ItemsController(menuItems){
    var itemList =this;
    itemList.menuItems=menuItems;
  }
})()
