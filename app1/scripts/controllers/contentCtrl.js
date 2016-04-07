'use strict';

/**
 * @ngdoc function
 * @name bigcommerceDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bigcommerceDemoApp
 */
angular.module('bigcommerceDemoApp')
  .controller('contentCtrl', function ($scope,GetBook,$rootScope) {
    
   $scope.books=GetBook;
   $scope.modal = false;
   $scope.newBook = true;
  

 
   /*$scope.confirm = function (){
   	var title = angular.element('#title').val();
   	var author = angular.element('#name').val();
   	var image = angular.element('.upload-image > img').attr('src');
   	$scope.form = {};

   	console.log(image);
   	var newBook = {
   		title:title,
   		author:author,
   		src:image,
   		category:'post'
   	};

    var i, isExisted=false, length= $scope.books.length;
    
    for(i=0;i<length;i++){
    	if(($scope.books[i].title == title)&&($scope.books[i].author == author)){
    		console.log($scope.books[i].title,title);
         isExisted=true;
          break;
    	}
    }
    if (!isExisted){
    	 $scope.books.push(newBook);
    	 $scope.modal = false;
    	 $scope.NewForm.setPristine();
    	 
    }
   else
   {
   	alert("Has Existed");
   }
   }; */
  });

