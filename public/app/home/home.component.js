(function () {
    "use strict";

    angular.module("lindex.home")
        .component("home", {
            templateUrl: "app/home/home.template.html",
            controller: homeController,
            controllerAs: "homeVm"
        });

        homeController.$inject = ["$state", "$localStorage", "DataService", "AuthenticationService"];
        function homeController  ( $state ,  $localStorage ,  DataService ,  AuthenticationService ) {
            let self = this;
            self.currentNavigation = 'Dashboard';

            (function init() {
                DataService.initialize($localStorage.currentUser.token, function (response) {
                    self.currentNavigation = "Classes";
                    self.name = DataService.user.lastName + ", " + DataService.user.firstName;
                    self.navMenu = false;
                    self.userMenu = false;
                });
            })();

            self.setNavigationTo = function (nav) {
                self.currentNavigation = nav;
                self.navMenu = false;
            };

            self.isNavigation = function (nav){
                if(self.currentNavigation === nav){
                    return true;
                }
            };

            self.logout = function () {
                AuthenticationService.logout();
                $state.go("account.login");
            };
        }
})();