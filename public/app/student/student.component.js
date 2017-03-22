(function () {
    "use strict";

    angular.module("lindex.student")
        .component("student", {
            templateUrl: "app/student/student.template.html",
            controller: studentController,
            controllerAs: "studentVm"
        });

    studentController.$inject = [];
    function studentController  () {
        let self = this;

        (function init() {
            self.tabs = [false, false, false];
        })();
    }
})();