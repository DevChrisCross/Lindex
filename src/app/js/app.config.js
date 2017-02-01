/**
 * Created by Chris on 10/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex")
        .config(lindexConfiguration)
        .run(lindexRun);

        lindexConfiguration.$inject = ["$urlRouterProvider", "$stateProvider"];
        function lindexConfiguration  ( $urlRouterProvider ,  $stateProvider ) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("account", {
                    abstract: true,
                    url: "/account",
                    template: "<account></account>"
                })
                .state("home", {
                    abstract: true,
                    url: "/",
                    template: "<home></home>"
                });
        }

        lindexRun.$inject = [];
        function lindexRun() {
            ;
        }
})();