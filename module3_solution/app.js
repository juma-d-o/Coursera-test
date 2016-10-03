(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);
  function FoundItems(){
    var ddo ={
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller:NarrowItDownController,
      controllerAs:'list',
      bindTocController: true
    };
    return ddo;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;
    list.searchTerm ="";
    list.message ="";
    list.found =[];
    list.narrowDown =function(){
      list.found =[];
      if(!list.searchTerm || list.searchTerm==""){
        list.message ="Nothing found";
      }else{
        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
        promise.then(function(result){
          list.found=result;
        });
      }
    };
    list.removeItem =function(itemIndex){
        list.found.splice(itemIndex,1);
    };
  };
  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      return $http({
       method: 'GET',
       url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
      }).then(function(result){
        var foundItems =result.data;
        for (var i=0;i<foundItems.length;i++){
          if(foundItems[i].indexOf(searchTerm)==-1){
            foundItems.splice(i,1);
          };
        };
        return foundItems;
      });
    };
  };

})();
