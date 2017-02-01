/**
 * Created by Chris on 11/01/2017.
 */
(function () {
    "use strict";
    
    angular.module("lindex.dashboard")
        .component("dashboard", {
            templateUrl: "js/home/dashboard/dashboard.template.html",
            controller: dashboardController,
            controllerAs: "dashboardVm"
        });
    
        dashboardController.$inject = [];
        function dashboardController  () {

        }
})();