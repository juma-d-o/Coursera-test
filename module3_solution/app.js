(function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItems);
  function FoundItems(){
    var ddo = {
      templateUrl:'foundItems.html',
      scope:{
        foundItems:"<",
        onRemove:"&",
        itemsEmpty: "<"
      },
      controller: NarrowItDownController,
      controllerAs: 'dirCtrl',
      bindToController:true
    }
    return ddo;
  }
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var ctrl = this;
  ctrl.found =[];
  ctrl.itemsEmpty=false;
  ctr.narrowItDownOnClick= function(){
    MenuSearchService.getMatchedMenuItems(ctr.searchTerm)
    .then(function(result){
      ctrl.found=result;
      ctrl.itemsEmpty=ctrl.found.length==0;
    })
  }
}

MenuSearchService.$inject = ['$q', '$http'];
function MenuSearchService($q,$http){
  var service= this;
  service.getMatchedMenuItems= function(searchTerm){
    var deffered =$q.defer();
    if(searchTerm.length==0){
      deffered.resolve([]);
      return deffered.promise;
    }
    return $http({
      method: "GET",
      url : "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function(result){
      var foundItems=[];
      var menu_items= result.data.menu_items;
      for (var i = 0; i < menu_items.length; i++) {
        if(menu_items[i].description.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1)
          foundItems.push(menu_items[i]);
      }
      deffered.resolve(foundItems);
      return deffered.promise;
    }).catch(function(httpError){
      console.log("http error:",httpError);
      return deffered.promise;
    });
  }
}

})()
