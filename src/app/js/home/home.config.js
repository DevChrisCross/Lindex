/**
 * Created by Chris on 11/01/2017.
 */
(function () {
    "use strict";
    
    angular.module("lindex.home")
        .config(homeConfiguration);
    
        homeConfiguration.$inject = ["$urlRouterProvider", "$stateProvider"];
        function homeConfiguration  ( $urlRouterProvider ,  $stateProvider ) {
            $stateProvider
                .state("home.dashboard", {
                    url: "",
                    template: "<dashboard></dashboard>"
                })
                .state("home.question", {
                    url: "question",
                    template: "<question></question>"
                })
                .state("home.quiz", {
                    url: "quiz",
                    template: "<quiz></quiz>"
                })
                .state("home.classComp", {
                    url: "classes",
                    template: "<class-comp></class-comp>"
                });
        }
})();