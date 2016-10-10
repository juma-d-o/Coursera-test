(function(){
  angular.module('Data')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject =['$http','$q'];
  function MenuDataService($http,$q) {
    var service = this;

    service.getAllCategories= function () {
      var deffered =$q.defer();
      return $http({
        method: 'GET',
        url:"https://davids-restaurant.herokuapp.com/categories.json"
      }).then(function(result){
        var foundCategories = result.data;
        deffered.resolve(foundItems);
        return deffered.promise;
      }).catch(function(httpError){
        console.log("http error:",httpError);
        return deffered.promise;
      });
    };

      service.getItemsForCategory = function(categoryShortName) {
        var deffered = $q.defer();
        return $http({
          method: 'GET',
          url: "https://davids-restaurant.herokuapp.com/menu_items.json",
          params:{
            category: categoryShortName
          }
        }).then(function(result){
          var foundMenuItems = result.data.menu_items;
          deffered.resolve(foundMenuItems);
          return deffered.promise;
        }).catch(function(httpError){
          console.log("httpError:",httpError);
          return deffered.promise;
        });
    };

  }

})()
