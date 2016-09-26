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
      buyList.emptyMessage="";
    buyList.items =ShoppingListCheckOffService.getBuyList();
    if(buyList.items.length == 0){
        buyList.emptyMessage="Everything is bought!";
    }
    else{
        buyList.emptyMessage="";
    };
    buyList.buy = function(itemIndex){
      service.buyItem(itemIndex);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtList = this;
   boughtList.emptyMessage="";
   boughtList.items =ShoppingListCheckOffService.getBoughtList();
   if(boughtList.items.length == 0){
       boughtList.emptyMessage="Nothing bought yet";
   }
   else{
       boughtList.emptyMessage="";
   }
  };

  function ShoppingListCheckOffService(){
    var service = this;
    var buyList =[{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10}];
    var boughtList =[];
    service.buyItem = function(itemIndex){
      var item = buyList[itemIndex];
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
