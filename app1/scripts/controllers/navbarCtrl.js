angular.module('bigcommerceDemoApp')
    .controller('navbarCtrl', function($scope, GetBook,$rootScope) {
        $scope.books = GetBook;
   
        $rootScope.toggleMenu = function() {

            $rootScope.collapsed = !$rootScope.collapsed;
            if($rootScope.collapsed == false){
            	angular.element('.nav-menu>ul').css('display','block');
            }
            else
            {
            	angular.element('.nav-menu>ul').css('display','none');
            }
        };
    });
