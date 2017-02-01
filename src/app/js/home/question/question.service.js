/**
 * Created by Chris on 14/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.question")
        .factory("questionService", questionService);

        questionService.$inject = ["$http"];
        function questionService  ( $http ) {
            let info;
            return{
                getCategories: function (name) {
                    $http.get("http://localhost:3000/professors?username=admin")
                        .then(function (response) {
                            name = response.data[0]["categories"];
                        });
                }
            };
        }
})();