(function () {
    "use strict";

    angular.module("lindex.tags")
        .component("tags", {
           templateUrl: "js/home/tags/tags.template.html",
            controller: tagsController,
            controllerAs: "tagsVm"
        });

    tagsController.$inject = [];
    function tagsController() {
        let self = this;

        (function init() {
            self.baseLimit = $rootScope.user.entryLimit[0];
        })();
    }
})();