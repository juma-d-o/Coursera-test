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
      }
    };
    return ddo;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrowItDownController = this;
    this.searchTerm ="";
    this.message ="";
    narrowItDownController.narrowDown =function(){
      this.found =[];
      if(!searchTerm || searchTerm==""){
        this.message ="Nothing found";
      }else{
        this.found = MenuSearchService.getMatchedMenuItems(searchTerm);
      }
    };
    narrowItDownController.removeItem =function(itemIndex){
        found.splice(itemIndex,1);
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
