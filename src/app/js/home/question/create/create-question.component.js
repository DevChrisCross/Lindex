/**
 * Created by Chris on 21/01/2017.
 */
(function () {
    "use strict";
    
    angular.module("lindex.question")
        .component("createQuestion", {
            templateUrl: "js/home/question/create/create-question.template.html",
            controller: createQuestionController,
            controllerAs: "questionVm"
        });
    
        createQuestionController.$inject = ["$http"];
        function createQuestionController  ( $http ) {
            let self = this;
            self.categories = ["category1", "Others"];
            self.subcategories = ["subcategory1", "Others"];
            self.subjects = ["subjects1", "Others"];

            self.data = {
                selectedCategory: undefined,
                selectedSubCategory: undefined,
                selectedSubject: undefined,
                question: undefined,
                answer: undefined
            };

            self.addQuestion = function () {
                $http.post("api/question/createQuestion.php", data)
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {

                    });
            }
        }
})();