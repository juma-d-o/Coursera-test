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
    buyList.emptyMessage ="";
    buyList.items =ShoppingListCheckOffService.getBuyList();
    if(items.length==0){
      buyList.emptyMessage="Everything bought!";
    }else{
      buyList.emptyMessage ="";
    };
    buyList.buy = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService){
   var boughtList = this;
   boughtList.emptyMessage="";
   boughtList.items =ShoppingListCheckOffService.getBoughtList();
   
  };

  function ShoppingListCheckOffService(){
    var service = this;
    var buyList =[{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10},{name: "Cookies",quantity: 10}];
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
