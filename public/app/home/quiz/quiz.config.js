/**
 * Created by Chris on 13/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.quiz")
        .config(quizConfiguration);
    
        quizConfiguration.$inject = ["$urlRouterProvider", "$stateProvider"];
        function quizConfiguration  ( $urlRouterProvider ,  $stateProvider ) {
            $stateProvider
                .state("home.quiz.create", {
                    url: "",
                    template: "<create-quiz></create-quiz>"
                })
                .state("home.quiz.create.addTest", {
                    url: "",
                    template: "<add-test></add-test>"
                });
        }
})();