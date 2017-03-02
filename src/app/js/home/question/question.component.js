(function () {
    "use strict";

    angular.module("lindex.question")
        .component("question", {
            templateUrl: "js/home/question/question.template.html",
            controller: questionController,
            controllerAs: "questionVm"
        });
    
        questionController.$inject = ["$state", "$rootScope", "$interval", "DataService"];
        function questionController  ( $state ,  $rootScope ,  $interval ,  DataService ) {
            let self = this;

            (function init() {
                self.headers = ["Category", "Subcategory", "Subject", "Question", "Answer", "Options"];
                self.sorters = ["Question", "Category", "Subcategory", "Subject"];
                self.selectedSorter = self.sorters[0];
                self.sortTypes = [{ name: "Ascending", value: false }, { name: "Descending", value: true }];
                self.selectedSortType = self.sortTypes[0];
                self.baseLimit = $rootScope.user.entryLimit[0];
                self.edit = undefined;

                self.data = {
                    selectedCategory: undefined,
                    selectedSubCategory: undefined,
                    selectedSubject: undefined,
                    question: undefined,
                    options: ["", ""],
                    answer: undefined
                };
            })();

            self.duplicate = function (source) {
                return DataService.duplicate(source);
            };

            self.choiceLimit = function (options, type) {
                DataService.choiceLimit(options, type);
            };

            self.sort = function(){
                self.sortKey = self.selectedSorter.toLowerCase();
                if (self.selectedSortType.toLowerCase() === "ascending") {
                    self.reverse = false;
                } else {
                    self.reverse = true;
                }
            };

            self.addQuestion = function () {
                DataService.addQuestion(self.data, function (response) {
                    self.data = {
                        selectedCategory: undefined,
                        selectedSubCategory: undefined,
                        selectedSubject: undefined,
                        question: undefined,
                        options: ["", ""],
                        answer: undefined
                    };
                });
            };

            self.editQuestion = function (item) {
                DataService.updateQuestion(item, function (response) {
                    self.edit = undefined;
                });
            };

            self.deleteQuestion = function (id) { DataService.deleteQuestion(id, function (response) {}); };

            self.checkInput = function () {
                if(self.data.selectedCategory !== undefined &&
                    self.data.selectedSubCategory !== undefined &&
                    self.data.selectedSubject !== undefined &&
                    self.data.question !== undefined && self.data.question !== "" &&
                    self.data.answer !== undefined){
                    for(let i = 0; i < self.data.options.length; i++){
                        if(self.data.options[i] === "" || self.data.options[i] === undefined){
                            return true;
                        }
                    }return false;
                }else{
                    return true;
                }

            };

            /**
            self.blah = function () {
                $interval.timeout(function () {
                    document.getElementById("iddidi").setAttribute("ng-class", "{'show' : questionVm.enable}")
                }, 5000);
            }*/
        }
})();