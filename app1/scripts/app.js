'use strict';

/**
 * @ngdoc overview
 * @name bigcommerceDemoApp
 * @description
 * # bigcommerceDemoApp
 *
 * Main module of the application.
 */
var app = angular
    .module('bigcommerceDemoApp', ['ui.router', 'ngAnimate']);
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
                '': { templateUrl: 'views/layout.html' },
                'navbar@home': {
                    templateUrl: 'views/navbar.html',
                    controller: 'navbarCtrl'
                },

                // the child views will be defined here (absolutely named)
                'content@home': {
                    templateUrl: 'views/content.html',
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
                reader.readAsDataURL(elem[0].files[0]);
            });
        }
    };
}]);

app.directive('toggle', function() {
    return {
        scope: {
            toggle: '=',
        },

        link: function($scope, element, attrs) {
            var attr = attrs.toggle;
            console.log(attr);
            angular.element('#test').html(attr);
            $scope.$watch("toggle", function(value) {
                element.toggleClass('active', value)
            })
            element.click(function() {
                $scope.$apply(function() {
                    $scope.toggle = !$scope.toggle
                })
            })
        }
    }
});

app.directive("modal", function() {
    return {
        restrict: "AE",
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: {
            ngModel: '=',
            books: '='

        },
        templateUrl: "views/modal.html",
        link: function(scope, ele, attr, ngModel) {

            //scope.modal=attr.status;
            
            scope.master = {
                title: '',
                name: '',
                image: '',
                category: 'post'
            };
            console.log(attr.books, scope.books,attr.ngModel,scope.ngModel);
            scope.reset = function() {
                scope.ngModel=false;
                scope.obj = angular.copy(scope.master);


                scope.NewForm.$setPristine();
                console.log(scope.NewForm);
            };
            angular.element("#label1").html(attr.title);
            angular.element("#label2").html(attr.name);
            angular.element('#image').html(attr.image);


            scope.confirm = function() {
                var title = angular.element('#title').val();
                var author = angular.element('#name').val();
                var image = angular.element('.upload-image > img').attr('src');
                scope.form = {};


                var newBook = {
                    title: title,
                    author: author,
                    src: image,
                    category: 'post'
                };

                var i, isExisted = false,
                    length = scope.books.length;

                for (i = 0; i < length; i++) {
                    if ((scope.books[i].title == title) && (scope.books[i].author == author)) {
                        console.log(scope.books[i].title, title);
                        isExisted = true;
                        break;
                    }
                }
                if (!isExisted) {
                    scope.books.push(newBook);
                    scope.ngModel=false;
                    scope.obj = angular.copy(scope.master);
                    scope.NewForm.$setPristine();

                } else {
                    alert("Has Existed");
                }
            };




        }


    };
});

app.factory('GetBook', [
    function() {
        var books = {
            Details: [{
                "title": "EI Pooch",
                "author": "Alex Nelson",
                "src": "images/Ei.png",
                "category": "book"
            }, {
                "title": "The Flight",
                "author": "Scott Nelson",
                "src": "images/Flight.png",
                "category": "book"
            }, {
                "title": "10 Best Places",
                "author": "Scott Nelson",
                "src": "images/Top.png",
                "category": "post"
            }]

        };
        return books;
    }
]);
app.factory('BookData', ['',
    function() {
        var BookData = {
            Details: [{
                "title": "EI Pooch",
                "author": "Alex Nelson",
                "src": "images/Ei.png",
                "category": "book"
            }, {
                "title": "The Flight",
                "author": "Scott Nelson",
                "src": "images/Flight.png",
                "category": "book"
            }, {
                "title": "10 Best Places",
                "author": "Scott Nelson",
                "src": "images/Top.png",
                "category": "post"
            }]
        };

    }
]);
