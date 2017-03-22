(function () {
    "use strict";

    angular.module("lindex.account")
        .component("accountLogin", {
            templateUrl: "app/account/account-login/account-login.template.html",
            controller: accountLoginController,
            controllerAs: "loginVm"
        });

        accountLoginController.$inject = ["$state", "$rootScope", "AuthenticationService", "DataService"];
        function accountLoginController  ( $state ,  $rootScope ,  AuthenticationService ,  DataService ) {
            let self = this;

            (function init() {
                self.invalid = false;
                self.user = {};
                self.user.signInAs = 'Student';
                $rootScope.user = undefined;
                AuthenticationService.logout();
            })();

            self.login = function () {
                event.preventDefault();
                AuthenticationService.login(self.user, function (response) {
                    if (response !== undefined) {
                        DataService.initialize(response, function (response) {
                            if(self.user.signInAs === 'Professor'){
                                $state.go("home.dashboard");
                            }else {
                                $state.go("student")
                            }
                        });
                    } else {
                        self.invalid = true;
                        self.user.username = undefined;
                        self.user.password = undefined;
                    }
                });
            }

        }
})();