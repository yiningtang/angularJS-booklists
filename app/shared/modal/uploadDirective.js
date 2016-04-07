'use strict';
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
}]);