(function(){
  'use strict';
  angular.module('MenuApp')
  .component('itemList',{
    templateUrl: 'src/item-list.template.html',
    bindings : {
      items : '<'
    }
  });
})()
