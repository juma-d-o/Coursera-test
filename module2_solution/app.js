(function(){
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController )
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject =['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buyList = this;
      buyList.emptyMessage=ShoppingListCheckOffService.buyListEmptyMessage();
    buyList.items =ShoppingListCheckOffService.getBuyList();
    buyList.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtList = this;
   boughtList.emptyMessage=ShoppingListCheckOffService.boughtListEmptyMessage();
   boughtList.items =ShoppingListCheckOffService.getBoughtList();

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
    service.getBuyList = function(){
      return buyList;
    };
   service.getBoughtList = function(){
     return boughtList;
   };
   service.boughtListEmptyMessage =fuction(){
     if(boughtList.length == 0){
         return "Nothing bought yet";
     }
     else{
         return "";
     }
   };
   service.buyListEmptyMessage =fuction(){
     if( buyList.length == 0){
         return "Everything is bought!";
     }
     else{
         return "";
     };
   };

  };
})();
