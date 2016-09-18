(function () {
  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope){
      $scope.message = "";
      $scope.checkIfTooMuch= function(){
        if(!$scope.dishes||$scope.dishes==""){
            $scope.message ="Please enter the data first";
        }else if ($scope.dishes.indexOf(",")==-1 ) {
          $scope.message ="Enjoy";
        }else {
          var dishcount =$scope.dishes.split(",").length;
          if(dishcount<=3){
            $scope.message ="Enjoy";
          }else{
            $scope.message ="Too much";
          }
        }
        return;
      };
  };

})();
