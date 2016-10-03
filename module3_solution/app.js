(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService);
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;
     list.found=[];
     list.narrowDown=function() {
      var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
       promise.then(function(result){
         list.found =result;
         console.log(list.found);
       });
     };
    };

    MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;
    service.getMatchedMenuItems= function(searchTerm){
    return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then(function(result){
        var foundItems =result.data.menu_items;
        return foundItems;
      });
    };

  };
})();
