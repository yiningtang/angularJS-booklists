'use strict';

/**
 * @ngdoc function
 * @name bigcommerceDemoApp.controller:contentCtrl
 * @description
 * # contentCtrl for the main content to produce new book cards 
 * Controller of the bigcommerceDemoApp
 */
home.controller('contentCtrl', function($scope, GetBook, $rootScope) {

    $scope.books = GetBook;
    $scope.modal = false;
    $scope.newBook = true;

});
