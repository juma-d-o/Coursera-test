(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController )
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService','$scope'];
  AlreadyBoughtController.$inject =['ShoppingListCheckOffService','$scope'];
  function ToBuyController(ShoppingListCheckOffService,$scope){
    var buyList = this;
    buyList.emptyMessage ="";
    buyList.items =ShoppingListCheckOffService.getBuyList();
    buyList.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
    if(buyList.length==0){
      $scope.emptyMessage= "Everything bought!";
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtList = this;
   boughtList.emptyMessage="Nothing bought!";
   boughtList.items =ShoppingListCheckOffService.getBoughtList();
   if(boughtList.length==0){
     boughtList.emptyMessage = "";
   };

  };

  function ShoppingListCheckOffService(){
    var service = this;
    var buyList =[{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10}];
    var boughtList =[];
    service.buyItem = function(itemIndex){
      var item = {name:buyList[itemIndex].name,quantity:buyList[itemIndex].quantity};
      boughtList.push(item);
      buyList.splice(itemIndex,1);
    };
    service.getBuyList = function(msg){
      return buyList;
    };
   service.getBoughtList = function(msg){
     return boughtList;
   };

  };
})();
