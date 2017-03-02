(function () {
    "use strict";

    angular.module("lindex.account")
        .component("accountRetrieve", {
            templateUrl: "js/account/account-retrieve/account-retrieve.template.html",
            controller: accountRetrieveController,
            controllerAs: "accountRetrieveVm"
        });

        accountRetrieveController.$inject = [];
        function accountRetrieveController  (){

        }
})();