/**
 * Created by Chris on 10/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.account")
        .config(accountConfiguration);

        accountConfiguration.$inject = ["$urlRouterProvider", "$stateProvider"];
        function accountConfiguration  ( $urlRouterProvider ,  $stateProvider ) {
            $stateProvider
                .state("account.login", {
                    url: "",
                    template: "<account-login></account-login>"
                })
                .state("account.retrieve", {
                    url: "/retrieve",
                    template: "<account-retrieve>"
                });
        }
})();