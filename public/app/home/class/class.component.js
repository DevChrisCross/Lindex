(function () {
    "use strict";

    angular.module("lindex.class")
        .component("classComp", {
            templateUrl: "app/home/class/class.template.html",
            controller: classController,
            controllerAs: "classVm"
        });
    
        classController.$inject = [];
        function classController() {
            
        }
})();