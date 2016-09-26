(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController )
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject =['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buyListController = this;
    buyListController.items =ShoppingListCheckOffService.getBuyList();
    buyListController.showEmptyMessage=ShoppingListCheckOffService.showEmptyBuyListMessage();
    buyListController.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtListController = this;
   boughtListController.showEmptyMessage=ShoppingListCheckOffService.showEmptyBoughtListMessage();
   boughtListController.items =ShoppingListCheckOffService.getBoughtList();
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
  service.showEmptyBuyListMessage = function(){
    return buyList.length ==0;
  };

  service.showEmptyBoughtListMessage = function(){
    return boughtList.length ==0;
  };
  };
})();
