'use strict';

/**
 * @ngdoc overview
 * @name bigcommerceDemoApp
 * @description
 * # bigcommerceDemoApp
 *
 * Main module of the application.
 */

var navbar=angular.module('navbar', []);
var home=angular.module('home', []);
var modal=angular.module('modal', []);

var app = angular
    .module('bigcommerceDemoApp', ['ui.router', 'ngAnimate', 'navbar', 'home', 'modal']);
app.run(function($rootScope) {
    $rootScope.collapsed = true;
});


app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states

    $stateProvider
        .state('home', {
            url: "/",
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'components/home/layout.html' },
                'navbar@home': {
                    templateUrl: 'shared/navbar/navbar.html',
                    controller: 'navbarCtrl'
                },

                // the child views will be defined here (absolutely named)
                'content@home': {
                    templateUrl: 'components/home/content.html',
                    controller: 'contentCtrl'
                }
            },
            resolve: {
                GetBook: function(GetBook) {
                    return GetBook.Details;
                }
            }

        });

});




app.factory('GetBook', [
    function() {
        var books = {
            Details: [{
                "title": "EI Pooch",
                "author": "Alex Nelson",
                "src": "assets/images/Ei.png",
                "category": "book"
            }, {
                "title": "The Flight",
                "author": "Scott Nelson",
                "src": "assets/images/Flight.png",
                "category": "book"
            }, {
                "title": "10 Best Places",
                "author": "Scott Nelson",
                "src": "assets/images/Top.png",
                "category": "post"
            }]

        };
        return books;
    }
]);
;'use strict';

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
;'use strict';
/*
@name modal
   * @requires {Boolean} ngModel trigger the modal.
   * @param {array} object-array that should be added new one.   
   * @description
      *create a pop-up modal.
      *allow users to input two pieces of data and upload an image.
      *provide non-repeat data validation on submiting the modal.
     @example
     <modal ng-model="modal" test="obj">
     </modal>
*/
modal.directive("modal", function() {
    return {
        restrict: "AE",
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: {
            ngModel: '=',
            books: '='

        },
        templateUrl: "shared/modal/modal.html",
        link: function(scope, ele, attr, ngModel) {   
            scope.master = {
                title: '',
                name: '',
                image: '',
                category: 'post'
            };
            //reset the modal//
            scope.reset = function() {
                scope.ngModel = false;
                scope.obj = angular.copy(scope.master);
                scope.NewForm.$setPristine();
            };
            angular.element("#label1").html(attr.title);
            angular.element("#label2").html(attr.name);
            angular.element('#image').html(attr.image);

//check non-repeat records and store new ones//
            scope.confirm = function() {
                var title = angular.element('#title').val();
                var author = angular.element('#name').val();
                var image = angular.element('.upload-image > img').attr('src');
                
                var i, isExisted = false,
                    length = scope.books.length;
                var newBook = {
                    title: title,
                    author: author,
                    src: image,
                    category: 'post'
                };

                
//check repeated items//
                for (i = 0; i < length; i++) {
                    if ((scope.books[i].title == title) && (scope.books[i].author == author)) {
                        isExisted = true;
                        break;
                    }
                }
                if (!isExisted) {
                    scope.books.push(newBook);
                    scope.ngModel = false;
                    scope.obj = angular.copy(scope.master);
                    scope.NewForm.$setPristine();

                } else {
                    alert("Has Existed");
                }
            };

        }


    };
});
;'use strict';
/**
@name upload
@desciption 
allow users to upload an image 
@example
<input upload type="file" name="upload">
**/
app.directive('upload', [function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var reader = new FileReader();
            reader.onload = function(e) {
                scope.image = e.target.result;
                scope.$apply();
            }

            elem.on('change', function() {
               var file= document.querySelector('input[type=file]').files[0];

                reader.readAsDataURL(file);
            });
        }
    };
}]);;'use strict';
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
