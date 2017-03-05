(function () {
    "use strict";

    angular.module("lindex.quiz")
        .component("quiz", {
            templateUrl: "app/home/quiz/quiz.template.html",
            controller: quizController,
            controllerAs: "quizVm"
        });
    
        quizController.$inject = ["$rootScope", "DataService"];
        function quizController  ( $rootScope ,  DataService ) {
            let self = this;

            (function init() {
                self.questionType = 'old';
                self.headers = ["Category", "Subcategory", "Subject", "Quiz Title", "Exam Date", "Status", "Options"];
                self.sorters = ["Title", "Category", "Subcategory", "Subject", "Date", "Status"];
                self.selectedSorter = self.sorters[0];
                self.sortTypes = [{ name: "Ascending", value: false }, { name: "Descending", value: true }];
                self.selectedSortType = self.sortTypes[0];
                self.baseLimit = $rootScope.user.entryLimit[0];
                self.edit = undefined;
                self.active = false;

                self.set = false;
                self.data = {
                    selectedCategory: undefined,
                    selectedSubCategory: undefined,
                    selectedSubject: undefined,
                    title: undefined,
                    duration: undefined,
                    passingPercent: undefined,
                    questions: [],
                };

                self.idCounter = 0;
                self.newQuestions = [];
                self.newQuestion = {
                    id: "tid-",
                    selectedCategory: undefined,
                    selectedSubCategory: undefined,
                    selectedSubject: undefined,
                    question: undefined,
                    options: ["", ""],
                    answer: 0
                };

                self.dateOptions = {
                    initDate: new Date(),
                    minDate: new Date()
                };

                self.qSearch = {
                    questions: [],
                    search: "",
                    headers: ["Category", "Subcategory", "Subject", "Question", "Options"],
                    sorters: ["Question", "Category", "Subcategory", "Subject"],
                    sortTypes: [{ name: "Ascending", value: false }, { name: "Descending", value: true }]
                };

                self.qSearch.selectedSorter = self.qSearch.sorters[0];
                self.qSearch.selectedSortType =  self.qSearch.sortTypes[0];
            })();

            self.checkSearch = function () {
                if(self.qSearch.search.length === 0){
                    self.qSearch.questions = [];
                }else{
                    self.qSearch.questions = $rootScope.user.questions;
                }
            };

            self.choiceLimit = function (options, type) {
                DataService.choiceLimit(options, type);
            };

            self.setTags = function () {
                console.log(self.data);
              if(self.data.selectedCategory !== undefined &&
                  self.data.selectedSubCategory !== undefined &&
                  self.data.selectedSubject !== undefined){
                  self.set = true;
                  self.setError = false;
              }else{
                  self.setError = true;
              }
            };

            self.popItem = function (item) {
                item.added = undefined;
                let tempQ = self.data.questions.filter(function (question) {
                    return question.id !== item.id;
                });
                self.data.questions = JSON.parse(JSON.stringify(tempQ));
                if(item.id.includes("tid")){
                    self.newQuestions = JSON.parse(JSON.stringify(self.newQuestions.filter(function (question) {
                        return question.id !== item.id;
                    })));
                }
            };

            self.addExistingQuestion = function (item) {
                if(item.added === undefined){
                    self.data.questions.push(item);
                    item.added = true;
                }
            };

            self.addNewQuestion = function () {
                self.idCounter++;
                self.newQuestion.id += self.idCounter;
                self.newQuestion.selectedCategory = self.data.selectedCategory;
                self.newQuestion.selectedSubCategory = self.data.selectedSubCategory;
                self.newQuestion.selectedSubject = self.data.selectedSubject;

                self.data.questions.push(self.newQuestion);
                self.newQuestions.push(self.newQuestion);
                self.newQuestion = {
                    id: "tid-",
                    selectedCategory: undefined,
                    selectedSubCategory: undefined,
                    selectedSubject: undefined,
                    question: undefined,
                    options: ["", ""],
                    answer: 0
                };
            };

            self.createQuiz = function () {
                for(let i = 0; i < self.newQuestions.length; i++){
                    self.newQuestions[i].id = undefined;
                    DataService.addQuestion(self.newQuestions[i], function (response) {
                        self.newQuestions[i].id = response;
                    });
                }

                DataService.createTest(self.data, function (response) {

                });

            };
        }
})();