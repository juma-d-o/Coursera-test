(function(){
  'use strict';
  angular.module('MenuApp')
  .component('categoryList',{
    templateUrl: 'src/category-list.template.html',
    bindings : {
      categories : '<'
    }
  });

})()
