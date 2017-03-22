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

    }
})();