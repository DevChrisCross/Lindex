/**
 * Created by Chris on 10/01/2017.
 */
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