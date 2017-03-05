(function () {
    "use strict";

    angular.module("lindex.account")
        .component("accountRetrieve", {
            templateUrl: "app/account/account-retrieve/account-retrieve.template.html",
            controller: accountRetrieveController,
            controllerAs: "accountRetrieveVm"
        });

        accountRetrieveController.$inject = [];
        function accountRetrieveController  (){

        }
})();