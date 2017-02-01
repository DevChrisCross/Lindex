/**
 * Created by Chris on 11/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.quiz")
        .component("quiz", {
            templateUrl: "js/home/quiz/quiz.template.html",
            controller: quizController,
            controllerAs: "quizVm"
        });
    
        quizController.$inject = [];
        function quizController() {
            let self = this;
            self.entries = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            self.entryLimit = self.entries[0];
            self.quizHeaders = ["Category", "Subcategory", "Subject", "Exam Title", "Exam Date", "Status", "Options"];
            self.selectedSorter = "Question";
            self.selectedSortType = {
                name: "Ascending",
                value: false
            };
            //self.sortType = "Ascending";
            self.sorters = ["Question", "Category", "Subcategory", "Subject"];
            self.sortTypes = [
                {
                    name: "Ascending",
                    value: false
                },
                {
                    name: "Descending",
                    value: true
                }
            ];
            self.categories = ["category1", "Others"];
            self.subcategories = ["subcategory1", "Others"];
            self.subjects = ["subjects1", "Others"];
            self.items = [
                {
                    category: "5th Standard",
                    subcategory: "Computer",
                    subject: "subject3",
                    exam: "the lame exam",
                    date: "10-01-2015",
                    status: "Deactivated"
                }
            ];
        }
})();