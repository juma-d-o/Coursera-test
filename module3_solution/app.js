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
        for (var i = 0; i < foundItems.length; i++) {
          if(foundItems[i].indexOf(searchTerm)===-1){
              foundItems.splice(i,1);
          };
        };
        return foundItems;
      });
    };

  };
})();
