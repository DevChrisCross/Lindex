(function () {
    "use strict";

    angular.module("lindex.tags")
        .component("tags", {
           templateUrl: "app/home/tags/tags.template.html",
            controller: tagsController,
            controllerAs: "tagsVm"
        });

    tagsController.$inject = ["$rootScope"];
    function tagsController  ( $rootScope ) {
        let self = this;

        (function init() {
            self.baseLimit = $rootScope.user.entryLimit[0];
            self.edit = undefined;
        })();

        self.data = {
            name: undefined
        };


    }
})();