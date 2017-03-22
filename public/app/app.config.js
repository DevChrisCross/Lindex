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
                })
                .state("student", {
                    url: "/student",
                    template: "<student></student>"
                });
        }

        lindexRun.$inject = ["$rootScope", "$http", "$state", "$location", "$localStorage"];
        function lindexRun  ( $rootScope ,  $http ,  $state ,  $location ,  $localStorage ) {
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                let publicPages = ['/account'];
                let restrictedPage = publicPages.indexOf($location.path()) === -1;
                if (restrictedPage && !$localStorage.currentUser) {
                    $location.path('/account');
                }
            });
        }
})();