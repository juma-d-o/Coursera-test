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
        foundItems: '<',
        onRemove:'&'
      },
      controller: NarrowItDownController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var list = this;
     list.found=[];
     list.searchTerm=="";
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

  MenuSearchService.$inject = ['$q', '$http'];
  function MenuSearchService ($q, $http) {
      var service = this;
      service.getMatchedMenuItems = function(searchTerm) {
          var deferred = $q.defer();
          if (searchTerm.length == 0) {
              deferred.resolve([]);
              return deferred.promise;
          }
          return $http({
              method : "GET",
              url : "https://davids-restaurant.herokuapp.com/menu_items.json"
          }).then(function (result) {
              var foundItems = [];
              var menu_items = result.data.menu_items;
              console.log(searchTerm);
              for (var i = 0; i < menu_items.length; i = i + 1) {
                  if (menu_items[i].description.toUpperCase()
                  .includes(searchTerm.toUpperCase()))
                      foundItems.push(menu_items[i]);
              }

              deferred.resolve(foundItems);
              return deferred.promise;
          }).catch(function (result) {
              console.log("http results : ", result );
              deferred.reject("Error with http : ", result);
              return deferred.promise;
          });
      }
  }
})();
