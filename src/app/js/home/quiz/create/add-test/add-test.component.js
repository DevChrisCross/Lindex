/**
 * Created by Chris on 13/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.quiz")
        .component("addTest", {
            templateUrl: "js/home/quiz/create/add-test/add-test.template.html",
            controller: addTestController,
            controllerAs: "addTestVm"
        });

        addTestController.$inject = [];
        function addTestController() {

        }
})();