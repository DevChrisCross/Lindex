(function () {
    "use strict";
    
    angular.module("lindex.account")
        .component("account", {
            templateUrl: "app/account/account.template.html",
            controller: accountController,
            controllerAs: "accountVm"
        });

        accountController.$inject = [];
        function accountController  () {
            
        }
})();