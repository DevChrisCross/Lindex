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
                self.headers = ["Category", "Subcategory", "Subject", "Quiz Title", "Duration", "Passing %", "Status", "Options"];
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
                    title: "",
                    duration: 60,
                    passingPercent: 50,
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
                //
                // self.dateOptions = {
                //     initDate: new Date(),
                //     minDate: new Date()
                // };

                self.qSearchEdit = {
                    questions: [],
                    search: ""
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

            self.checkSearch = function (search) {
                if(search.length === 0){
                    return [];
                }else{
                    return $rootScope.user.questions;
                }
            };

            self.choiceLimit = function (options, type) {
                DataService.choiceLimit(options, type);
            };

            self.setTags = function () {
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
                self.data.questions = self.data.questions.filter(function (question) {
                    return question.added === true;
                });
                if(item.id.includes("tid")){
                    self.newQuestions = self.newQuestions.filter(function (question) {
                        return question.id !== item.id;
                    });
                }
            };

            self.popEditItem = function (item) {
                item.editAdded = undefined;
                self.edit.questions = self.edit.questions.filter(function (question) {
                   return question.editAdded === true;
                });
                for(let i = 0; i < $rootScope.user.questions.length; i++){
                    if(item.id === $rootScope.user.questions[i].id){
                        delete $rootScope.user.questions[i].editAdded;
                    }
                }

            };

            self.modifyQuiz = function (item, mode) {
                if(item.status==0){
                    self.edit = DataService.duplicate(item);
                    self.edit.mode = mode;
                    DataService.viewTest(self.edit.id, function (response) {
                        self.edit.questions = response;
                        console.log($rootScope.user.questions);

                        for(let i = 0; i < self.edit.questions.length; i++){
                            for(let j = 0; j < $rootScope.user.questions.length; j++){
                                if(self.edit.questions[i].id === $rootScope.user.questions[j].id){
                                    self.edit.questions[i].editAdded = true;
                                    $rootScope.user.questions[j].editAdded = true;
                                    break;
                                }
                            }
                        }
                    });
                }
            };

            self.addExistingQuestion = function (item, questions, mode) {
                if(item.added === undefined && mode === 'new'){
                    questions.push(item);
                    item.added = true;
                }if(item.editAdded === undefined && mode === 'edit'){
                    questions.push(item);
                    item.editAdded = true;
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

            self.checkQuiz = function (data) {
                if(data === undefined || data.title === undefined || data.questions === undefined || data.title === "" ||
                    data.duration < 1 || data.passingPercent < 1 || data.questions.length < 10){
                    return true;
                }else{
                    return false;
                }
            };

            self.createQuiz = function () {
                if(!self.checkQuiz()){
                    if(self.newQuestions !== []){
                        for(let i = 0; i < self.newQuestions.length; i++){
                            self.newQuestions[i].id = undefined;
                            DataService.addQuestion(self.newQuestions[i], function (response) {
                                self.newQuestions[i].id = response;
                            });
                        }
                    }

                    for(let i = 0; i < self.data.questions.length; i++){
                        self.data.questions[i].orderNo = i;
                    }

                    DataService.createTest(self.data, function (response) {
                        self.data = {
                            selectedCategory: undefined,
                            selectedSubCategory: undefined,
                            selectedSubject: undefined,
                            title: undefined,
                            duration: 60,
                            passingPercent: 50,
                            questions: [],
                        };
                        self.set = false;
                    });
                }
            };

            self.changeStatus = function () {

            };

            self.updateQuiz = function () {
                if(self.edit.questions.length >= 10){
                    for(let i = 0; i < self.edit.questions.length; i++){
                        self.edit.questions[i].orderNo = i;
                    }
                    console.log(self.edit);
                    DataService.updateTest(self.edit, function (response) {
                        self.edit = undefined;
                    });
                }
            };

            self.deleteQuiz = function (item) {
                if(item.status==0){
                    DataService.deleteTest(item.id, function (response) {});
                }
            }
        }
})();