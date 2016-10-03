(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive("foundItems",FoundItems);

  function FoundItems(){
    var ddo {
      templateUrl:'foundItems.html',
      scope:{
        foundItems: "<",
        onRemove: "&"
      },
      controller: 'NarrowItDownController as list',
      bindToController: true
    };
    return ddo;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;
     list.found=[];
     list.searchTerm="";
     list.message="";
     list.narrowDown=function() {
      if(!list.searchTerm || list.searchTerm==""){
         list.message= "Nothing found";
         list.found=[];
      }else{
        var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
         promise.then(function(result){
           list.found =result;
           console.log(list.found);
           list.message="";
         });
      };
     };

    list.removeItem= function(itemIndex){
      list.found.splice(itemIndex,1);
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
          var description=foundItems[i].description;
          if(description.toLowerCase().indexOf(searchTerm)==-1){
              foundItems.splice(i,1);
          };
        };
        return foundItems;
      });
    };
  };
})();
