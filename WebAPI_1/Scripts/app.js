var TestApp = angular.module('TestApp',['ngResource']);


TestApp.service('bookService', function ($http) {

   

    this.getBooks = function (callback) {
       
        console.log('getting books');
        $http.get("/api/books").success(
            function (response) {
                callback(response);
        });
       
       
    }

})

TestApp.controller('TestController', function ($scope,$resource,$http,bookService) {
    $scope.test = "Testna vrijednost";
  
    $scope.books = [];

    var refreshBooks = function () {
        bookService.getBooks(function (data) {
            $scope.books = data;
        })
    };

    refreshBooks();

    $scope.submitBook = function () {
       
        console.log('Book submitted ' + $scope.Title);

        var Book = {
            Title: $scope.Title,
            Year: 1999,
            AuthorId: 1,
            Price: 2.45
        }

        $http.post("/api/books",Book).
        success(function (response) {
            refreshBooks();
            console.log('OK post');
        }).
        error(function () {
            console.log('Error post');
        })
    }
    
   

});