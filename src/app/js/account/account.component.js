(function () {
    "use strict";
    
    angular.module("lindex.account")
        .component("account", {
            templateUrl: "js/account/account.template.html",
            controller: accountController,
            controllerAs: "accountVm"
        });

        accountController.$inject = [];
        function accountController  () {
            
        }
})();