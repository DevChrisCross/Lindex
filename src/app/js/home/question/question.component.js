/**
 * Created by Chris on 13/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.question")
        .component("question", {
            templateUrl: "js/home/question/question.template.html",
            controller: questionController,
            controllerAs: "questionVm"
        });
    
        questionController.$inject = ["$http", "questionService"];
        function questionController  ( $http ,  questionService ) {

            (function init() {
                $http.get("http://localhost/lindex/src/api/question/getAllQuestions.php")
                    .then(function (response) {
                        self.items = JSON.parse(JSON.stringify(response.data));
                        console.log(self.items);

                        self.items.forEach(function (item) {

                        })
                    });
            })();

            
            let self = this;
            self.entries = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
            self.entryLimit = self.entries[0];
            self.questionHeaders = ["Category", "Subcategory", "Subject", "Question", "Answer", "Options"];
            self.selectedCategory = "Choose a category";
            self.selectedSubCategory = "Choose a subcategory";
            self.selectedSubject = "Choose a subject";
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

            /*
            self.items = [
                {
                    id: 1,
                    category: "mayabang1",
                    subcategory: "dfs",
                    subject: "fsdfasd",
                    question: "Sino mas mayabang si marvin o si christian o pinaka si jervin1? osdpfiipopewkkkkfkkfkkfkkfkfkfkkfkfkkqqqqppvovooovovovoovkmmmlkskskzzaafdfd000000000000Sino mas mayabang si marvin o si christian o pinaka si jervin1? osdpfiipopewkkkkfkkfkkfkkfkfkfkkfkfkkqqqqppvovooovovoSino mas mayabang si marvin o si christian o pinaka si jervin1? osdpfiipopewkkkkfkkfkkfkkfkfkfkkfkfkkqqqqppvovooovovovoovkmmmlkskskzzaafdfd000000000000Sino mas mayabang si marvin o si christian o pinaka si jervin1? osdpfiipopewkkkkfkkfkkfkkfkfkfkkfkfkkqqqqppvovooovovo",
                    answer: "None"
                },
                {
                    id: 2,
                    category: "mayabang2",
                    subcategory: "dfs",
                    subject: "fsdfasd",
                    question: "Sino mas mayabang si marvin o  o pinaka si jervin?2",
                    answer: "None"
                },
                {
                    id: 3,
                    category: "mayabang3",
                    subcategory: "dfs",
                    subject: "fsdfasd",
                    question: "Sino mas  marvin o si christian o pinaka si jervin?3",
                    answer: "None"
                },
                {
                    id: 4,
                    category: "mayabang4",
                    subcategory: "dfs",
                    subject: "fsdfasd",
                    question: "Sino mas mayabang si marvin o si christian o ?4",
                    answer: "None"
                },
                {
                    id: 5,
                    category: "mayabang5",
                    subcategory: "dfs",
                    subject: "fsdfasd",
                    question: "Sino mas mayabang o si christian o pinaka si jervin?8",
                    answer: "None"
                }
            ];*/
            //self.totalItems = self.items.length;
            self.sortKey = 'category';
            self.reverse = false;

            self.sort = function(){
                self.sortKey = self.selectedSorter.toLowerCase();   //set the sortKey to the param passed
                if(self.selectedSortType.toLowerCase()  === "ascending"){
                    self.reverse = false;
                }else{
                    self.reverse = true;
                }
                //self.reverse = !self.reverse; //if true make it false and vice versa
            }
        }
})();