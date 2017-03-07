(function () {
    "use strict";

    angular.module("lindex.tags")
        .component("tags", {
           templateUrl: "app/home/tags/tags.template.html",
            controller: tagsController,
            controllerAs: "tagsVm"
        });

    tagsController.$inject = ["$rootScope", "DataService"];
    function tagsController  ( $rootScope ,  DataService ) {
        let self = this;

        (function init() {
            self.baseLimit = $rootScope.user.entryLimit[0];
            self.edit = {
                category: undefined,
                subcategory: undefined
            };
            self.data = {
                category: undefined,
                subcategory: undefined
            };;
        })();

        self.duplicate = function (source) {
            return DataService.duplicate(source);
        };

        self.createCategory = function () {
            DataService.createTag(self.data.category, "category", function (response) {});
        };

        self.editCategory = function () {
            DataService.updateTag(self.edit.category, "category", function (response) {});
        };

        self.deleteCategory = function (id) {
            DataService.deleteTag(id, "category", function (response) {});
        };

        self.createSubcategory = function () {
            DataService.createTag(self.data.subcategory, "subcategory", function (response) {});
        };

        self.editSubcategory = function () {
            DataService.updateTag(self.edit.subcategory, "subcategory", function (response) {});
        };

        self.deleteSubcategory = function (id) {
            DataService.deleteTag(id, "subcategory", function (response) {});
        };


    }
})();