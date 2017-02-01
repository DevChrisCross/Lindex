/**
 * Created by Chris on 10/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.account")
        .component("accountLogin", {
            templateUrl: "js/account/account-login/account-login.template.html",
            controller: accountLoginController,
            controllerAs: "accountLoginVm"
        });

        accountLoginController.$inject = ["$http", "$state"];
        function accountLoginController  ( $http ,  $state ) {
            let self = this;
            self.signInAs = 'Student';
            self.incorrect = false;
            self.user = {};

            self.login = function () {

                event.preventDefault();

                //$state.go("home.dashboard");
                /*
                event.preventDefault();
                $http.get("http://localhost:3000/" + self.signInAs + "s?username=" + self.user.username + "&&password=" + self.user.password)
                    .then(function (response) {
                        let api = JSON.stringify(response.api[0]);
                        if (api !== undefined) {
                            api = JSON.parse(api);
                            accountService.setName(api.name);
                            $state.go("home.dashboard");
                        } else {
                            self.user.username = self.user.password = "";
                            self.incorrect = true;
                        }

                    });//*/



            }
        }
})();