'use strict';
/**
 * @ngdoc function
 * @name bigcommerceDemoApp.controller:navbartCtrl
 * @description
 * # navbarCtrl for bigcommerceDemoApp to responsively show book titles 
 * Controller of the bigcommerceDemoApp
 */
navbar.controller('navbarCtrl', function($scope, GetBook, $rootScope) {
    $scope.books = GetBook;

    $rootScope.toggleMenu = function() {

        $rootScope.collapsed = !$rootScope.collapsed;
        if ($rootScope.collapsed == false) {
            angular.element('.nav-menu>ul').css('display', 'block');
        } else {
            angular.element('.nav-menu>ul').css('display', 'none');
        }
    };
});
