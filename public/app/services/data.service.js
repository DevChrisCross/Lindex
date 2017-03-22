(function () {
    "use strict";

    angular.module("lindex")
        .factory("DataService", DataService);

    DataService.$inject = ["$http", "$q", "$localStorage", "$rootScope", "AuthenticationService"];
    function DataService  ( $http ,  $q ,  $localStorage ,  $rootScope ,  AuthenticationService ) {
        let baseAPI = "http://localhost/lindex/api/";
        let self = {};

        self.user = undefined;
        self.initialize = initialize;

        self.duplicate = duplicate;
        self.choiceLimit = choiceLimit;

        self.addQuestion = addQuestion;
        self.readQuestion = readQuestion;
        self.updateQuestion = updateQuestion;
        self.deleteQuestion = deleteQuestion;

        self.createTest = createTest;
        self.readTest = readTest;
        self.viewTest = viewTest;
        self.updateTest = updateTest;
        self.deleteTest = deleteTest;
        self.assignTest = assignTest;
        self.postponeTest = postponeTest;

        self.readTags = readTags;
        self.createTag = createTag;
        self.updateTag = updateTag;
        self.deleteTag = deleteTag;

        self.readClass = readClass;

        return self;

        /**------------------------------------------------Functions-----------------------------------------------*/

        function choiceLimit(options, type) {
            if(type === "upper"){
                (options.length < 4) ? options.push('') : undefined;
            }
            if(type === "lower"){
                (options.length > 2) ? options.pop() : undefined ;
            }
        }
        
        function duplicate(source) {
            return JSON.parse(JSON.stringify(source));
        }

        function initialize(token, callback) {
            self.user = AuthenticationService.decodeToken(token);
            $rootScope.user = {};
            $rootScope.user.entryLimit = [10, 15, 20, 25, 30, 35, 40];

            self.readTags(function (response) {
                self.readQuestion(function (response) {
                    self.readTest(function (response) {
                        self.readClass(function () {
                            callback(true);
                        });
                    });
                });
            });
        }

        function addQuestion(data, callback) {
            data.user = self.user.id;
            $http.post(baseAPI + "question/create.php", data)
                .then(function (response) {
                    console.log(response.data);
                    delete data.user;
                    self.readQuestion(function (response) {});
                    callback(response.data);
                });
        }

        function readQuestion(callback) {
            $http.post(baseAPI + "question/read.php", {user: self.user.id})
                .then(function (response) {
                    response = JSON.parse(JSON.stringify(response.data));
                    for(let i = 0; i < response.length; i++){
                        response[i].options = [];
                        let tempArray = [response[i].option1, response[i].option2, response[i].option3, response[i].option4];
                        for(let j = 0; j < tempArray.length; j++){
                            if(tempArray[j] !== "" && tempArray[j] !== null){
                                response[i].options.push(tempArray[j]);
                            }
                        }
                        delete response[i].option1;
                        delete response[i].option2;
                        delete response[i].option3;
                        delete response[i].option4;
                    }
                    console.log(response);
                    $rootScope.user.questions = response;
                    $rootScope.user.questionTotalItems = $rootScope.user.questions.length;
                    callback(true);
                });
        }

        function updateQuestion(question, callback) {
            console.log(question);
            $http.post(baseAPI + "question/update.php", question)
                .then(function (response) {
                    console.log(response);
                    if(response.data === true) {
                        self.readQuestion(function (response) {
                            callback(response);
                        });
                    }
                })
        }

        function deleteQuestion(id, callback) {
            $http.post(baseAPI + "question/delete.php", {id: id})
                .then(function (response) {
                    if(response.data === true) {
                        self.readQuestion(function (response) {
                            callback(response);
                        });
                    }
                })
        }

        function readTags(callback) {
            let userID = self.user.id;
            $q.all([
                $http.post(baseAPI + "category/read.php", {user: userID}),
                $http.post(baseAPI + "subcategory/read.php", {user: userID}),
                $http.post(baseAPI + "subject/read.php", {user: userID})
            ]).then(function (values) {
                let response = JSON.parse(JSON.stringify(values));
                $rootScope.user.categories = response[0].data;
                $rootScope.user.subcategories = response[1].data;
                $rootScope.user.subjects = response[2].data;
                callback(true);
            });
        }
        
        function createTag(data, type, callback) {
            data.user = self.user.id;
            $http.post(baseAPI + type + "/create.php", data)
                .then(function (response) {
                   self.readTags(function (response) {});
                   callback(response.data);
                });
        }

        function updateTag(data, type, callback) {
            $http.post(baseAPI + type + "/update.php", data)
                .then(function (response) {
                    self.readTags(function (response) {
                        self.readQuestion(function (response) {});
                        self.readTest(function (response) {});
                    });
                    callback(response.data);
                });
        }

        function deleteTag(id, type, callback) {
            $http.post(baseAPI + type + "/delete.php", id)
                .then(function (response) {
                    self.readTags(function (response) {});
                    callback(response.data);
                });
        }

        function createTest(data, callback) {
            data.user = self.user.id;
            $http.post(baseAPI + "quiz/create.php", data)
                .then(function (response) {
                    self.readTest(function (response) {});
                    callback(response.data);
                });
        }

        function readTest(callback) {
            $http.post(baseAPI + "quiz/read.php", {user: self.user.id})
                .then(function (response) {
                    response = JSON.parse(JSON.stringify(response.data));
                    $rootScope.user.quizzes = response;
                    $rootScope.user.quizTotalItems = $rootScope.user.quizzes.length;
                    callback(true);
                });
        }

        function updateTest(data, callback) {
            $http.post(baseAPI + "quiz/update.php", data)
                .then(function (response) {
                    self.readTest(function (response) {});
                    callback(response);
                });
        }

        function viewTest(id, callback) {
            $http.post(baseAPI + "quiz/view.php", {id: id})
                .then(function (response) {
                    response = JSON.parse(JSON.stringify(response.data));
                    console.log(response);
                    for(let i = 0; i < response.length; i++){
                        response[i].options = [];
                        let tempArray = [response[i].option1, response[i].option2, response[i].option3, response[i].option4];
                        for(let j = 0; j < tempArray.length; j++){
                            if(tempArray[j] !== "" && tempArray[j] !== null){
                                response[i].options.push(tempArray[j]);
                            }
                        }
                        delete response[i].option1;
                        delete response[i].option2;
                        delete response[i].option3;
                        delete response[i].option4;
                    }
                    callback(response);
                });
        }

        function deleteTest(id, callback) {
            $http.post(baseAPI + "quiz/delete.php", {id: id})
                .then(function (response) {
                    self.readTest(function (response) {});
                    callback(response);
                });
        }

        function assignTest(data, callback) {
            $http.post(baseAPI + "quiz/assign.php", data)
                .then(function (response) {
                    self.readTest(function (response) {});
                    self.readClass(function (response) {});
                    callback(response);
                });

        }

        function postponeTest(data, callback) {
            $http.post(baseAPI + "quiz/postpone.php", data)
                .then(function (response) {
                    self.readTest(function (response) {});
                    self.readClass(function (response) {});
                    callback(response);
                });
        }

        function readClass(callback) {
            $http.post(baseAPI + "section/read.php", {user: self.user.id})
                .then(function (response) {
                    response = JSON.parse(JSON.stringify(response.data));
                    $rootScope.user.classes = response;
                    callback(true);
                });
        }
    }
})();