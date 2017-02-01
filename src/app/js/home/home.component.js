/**
 * Created by Chris on 11/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.home")
        .component("home", {
            templateUrl: "js/home/home.template.html",
            controller: homeController,
            controllerAs: "homeVm"
        });

        homeController.$inject = [];
        function homeController  () {
            let self = this;
            self.name = "";
            self.showNavMenu = false;
            self.currentNavigation = "Dashboard";

            self.setNavigationTo = function (nav) {
                self.currentNavigation = nav;
                self.showNavMenu = false;
            }

            self.isNavigation = function (nav){
                if(self.currentNavigation === nav){
                    return true;
                }
            }
        }
})();