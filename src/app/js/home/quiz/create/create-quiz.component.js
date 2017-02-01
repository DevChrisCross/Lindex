/**
 * Created by Chris on 13/01/2017.
 */
(function () {
    "use strict";
    
    angular.module("lindex.quiz")
        .component("createQuiz", {
            templateUrl: "js/home/quiz/create/create-quiz.template.html",
            controller: createQuizController,
            controllerAs: "createQuizVm"
        });
    
        createQuizController.$inject = ["createQuizService"];
        function createQuizController  ( createQuizService ) {
            //instead use Services when ready
            let self = this;
            self.subExamTypes = ["subExam1", "subExam2", "subExam3"];
            self.examTypes = ["Multiple Choice", "Fill-in-the-blanks"];
        }
})();