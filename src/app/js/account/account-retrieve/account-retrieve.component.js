/**
 * Created by Chris on 10/01/2017.
 */
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