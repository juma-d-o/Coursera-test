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
    buyList.items =ShoppingListCheckOffService.getBuyList();
    buyList.emptyMessage=ShoppingListCheckOffService.buyListEmptyMessage(buyList.items);
    buyList.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtList = this;
   boughtList.items =ShoppingListCheckOffService.getBoughtList();
   boughtList.emptyMessage=ShoppingListCheckOffService.boughtListEmptyMessage(boughtList.items);
  };

  function ShoppingListCheckOffService(){
    var service = this;
    var buyList =[{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10}];
    var boughtList =[];
    service.buyListEmptyMessage = function (items){
      var msg ="";
      if(!items || items.length==0){
        msg= "Everything bought!";
      }else{
        msg ="";
      };
      return msg;
    };
    service.boughtListEmptyMessage = function (items){
      var msg ="";
      if(!items || items.length==0){
        msg= "Nothing bought!";
      }else{
        msg ="";
      };
      return msg;
    };
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
  };
})();
