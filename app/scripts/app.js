var app = angular.module('testAngular', []);

app.controller('MainCtrl', function($scope) {

  $scope.customers = [
    { id : 1, name: "Robert Jr.", type: "Employee", over_two_year: false },
    { id : 2, name: "Alexander.", type: "Member", over_two_year: false },
    { id : 3, name: "Brandon", type: "Customer", over_two_year: false },
    { id : 4, name: "Chloe", type: "Customer", over_two_year: true },
  ];

  $scope.items = [
    { id : 1, name: "Cheeses", type: "Groceries", capacity: "100 Pieces", price: 500 },
    { id : 2, name: "Meat", type: "Groceries", capacity: "100 Kg" ,price: 1000 },
    { id : 3, name: "Tissue", type: "Personal Care", capacity: "100 Pieces", price: 400 },
    { id : 4, name: "Soap", type: "Personal Care", capacity: "100 Pieces", price: 300 },
    { id : 5, name: "Battery", type: "Electronics", capacity: "100 Piece", price: 100 }
  ];

  $scope.totalPrice = 0;
  $scope.shops = [];
  $scope.percenDiscount = 0;
  $scope.priceDiscount = 0;
  $scope.totalAfterDiscount = 0;

  $scope.addItem = function(item){
    $scope.counter >= 0 ? $scope.counter++ : $scope.counter=0;
    $scope.shops.push({id: $scope.counter, name: item.name, type: item.type, capacity: item.capacity, price: item.price});
    $scope.totalPrice += item.price;
    $scope.discountItem();
  };

  $scope.deleteItem = function(shop){
    var index = $scope.shops.indexOf(shop);
    $scope.shops.splice(index,1);
    $scope.totalPrice -= shop.price;
    $scope.discountItem();
  };

  $scope.discountItem = function(){
    if ($scope.shops.length != 0){
      var isGroceries = false;
      $scope.shops.find(function(shop){
        if (shop.type === "Groceries")
        { return isGroceries = true } });

      if (isGroceries){
        $scope.percenDiscount = 0;
        $scope.priceDiscount = 0;
        $scope.totalAfterDiscount = $scope.totalPrice;
      } else {
        $scope.priceDiscount = Math.floor($scope.totalPrice/100) * 5;
        $scope.totalAfterDiscount = $scope.totalPrice - $scope.priceDiscount;
        $scope.percenDiscount = $scope.totalAfterDiscount/$scope.totalPrice;
      }

    } else {
      $scope.percenDiscount = 0;
      $scope.priceDiscount = 0;
      $scope.totalAfterDiscount = $scope.totalPrice;
      $scope.selector = null;
    }
  }

  $scope.changeDiscount = function(selector){
    if (selector !== null) {
      if (selector.type === "Employee"){
        $scope.percenDiscount = 30;
        $scope.priceDiscount = Math.floor(($scope.totalPrice * 0.3));
        $scope.totalAfterDiscount = $scope.totalPrice - $scope.priceDiscount;
      } else if (selector.type === "Member"){
        $scope.percenDiscount = 10;
        $scope.priceDiscount = Math.floor(($scope.totalPrice * 0.1));
        $scope.totalAfterDiscount = $scope.totalPrice - $scope.priceDiscount;
      } else if (selector.type === "Customer" && selector.over_two_year === true){
        $scope.percenDiscount = 5;
        $scope.priceDiscount = Math.floor(($scope.totalPrice * 0.05));
        $scope.totalAfterDiscount = $scope.totalPrice - $scope.priceDiscount;
      } else {
        $scope.discountItem();
      }
    } else {
      $scope.discountItem();
    }
  }

});
