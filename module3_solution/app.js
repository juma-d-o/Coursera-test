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
        foundItems: '<',
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
    var narrowItDownController = this;
    narrowItDownController.searchTerm ="";
    narrowItDownController.message ="";
    narrowItDownController.found =[];
    narrowItDownController.narrowDown =function(){
      narrowItDownController.found =[];
      if(!searchTerm || searchTerm==""){
        narrowItDownController.message ="Nothing found";
      }else{
        narrowItDownController.found = MenuSearchService.getMatchedMenuItems(searchTerm);
      }
    };
    narrowItDownController.removeItem =function(itemIndex){
        narrowItDownController.found.splice(itemIndex,1);
    }
  };
  MenuSearchService.$inject=['$http']
  function MenuSearchService($http){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      return $http({

      }).then(function(result){
        var foundItems =result.data;
        for (i==0;i<foundItems.length;i++){
          if(foundItems[i].indexOf(searchTerm)==-1){
            foundItems.splice(i,1);
          };
        };
        return foundItems;
      });
    };
  };

})();
