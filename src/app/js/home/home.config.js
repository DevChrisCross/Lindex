(function () {
    "use strict";
    
    angular.module("lindex.home")
        .config(homeConfiguration);
    
        homeConfiguration.$inject = ["$stateProvider"];
        function homeConfiguration  ( $stateProvider ) {
            $stateProvider
                .state("home.dashboard", {
                    url: "",
                    template: "<dashboard></dashboard>"
                })
                .state("home.tags", {
                    url: "tags",
                    template: "<tags></tags>"
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