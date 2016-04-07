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
