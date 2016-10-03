(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrowItDownController = this;
    narrowItDownController.narrowDown=function(){
      narrowItDownController.found =ShoppingListCheckOffService.getMatchedMenuItems(narrowItDownController.searchTerm);
    };
    };
  };
  function MenuSearchService(){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then(function(result){
        var founditems =result.data;
      });
    };
  };
})();
