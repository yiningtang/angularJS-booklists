'use strict';
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
