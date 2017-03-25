(function () {
    "use strict";

    angular.module("lindex.student")
        .component("student", {
            templateUrl: "app/student/student.template.html",
            controller: studentController,
            controllerAs: "studentVm"
        });

    studentController.$inject = ["$state", "$localStorage", "$rootScope", "DataService", "AuthenticationService"];
    function studentController  ( $state ,  $localStorage ,  $rootScope ,  DataService ,  AuthenticationService ) {
        let self = this;

        self.logout = logout;
        self.updateQuizStatus = updateQuizStatus;
        self.takeQuiz = takeQuiz;
        self.nextQuestion = nextQuestion;
        self.setCurrentAnswer = setCurrentAnswer;

        (function init() {
            self.quizStarted = false;
            self.activeQuiz = undefined;
            self.questionIndex = 0;
            self.tabs = [false, false, false];
            DataService.studentInitialize($localStorage.currentUser.token, function (response) {
                self.name = DataService.user.lastName + ", " + DataService.user.firstName;
            });
            self.updateQuizStatus();
            console.log(self.quizzes);
        })();

        function updateQuizStatus() {
            self.quizzes = {
                upcomingToday: [],
                upcomingDays: [],
                active: [],
                taken: [],
                missed: []
            };

            DataService.readSchedule(function (response) {
                for(let i = 0; i < $rootScope.user.classes.length; i++){
                    let subjectClass = DataService.duplicate($rootScope.user.classes[i]);
                    for(let j = 0; j < $rootScope.user.classes[i].quizzes.length; j++){
                        let quiz = DataService.duplicate($rootScope.user.classes[i].quizzes[j]);
                        let quizStart = new Date(quiz.schedule);
                        let quizEnd = new Date(quiz.schedule);
                        let today = new Date();

                        quizEnd.setMinutes(quizStart.getMinutes() + parseInt(quiz.duration));
                        quiz.schedule = quizStart;
                        quiz.subject = subjectClass;
                        quiz.quizEnd = quizEnd;

                        if(quizStart.getDate() > today.getDate() && quiz.score == undefined){
                            self.quizzes.upcomingDays.push(quiz);
                        }else if(quizStart.getDate() === today.getDate() && quiz.score == undefined){
                            if(quizStart.getHours() > today.getHours()){
                                self.quizzes.upcomingToday.push(quiz);
                            }else if(quizStart.getHours() === today.getHours() && quizStart.getMinutes() <= today.getMinutes() && quizEnd.getMinutes() >= today.getMinutes()){
                                self.quizzes.active.push(quiz);
                            }
                        }
                        if(quiz.score){
                            self.quizzes.taken.push(quiz);
                        }else if(quizEnd.getTime() < today.getTime() && quiz.score == undefined){
                            self.quizzes.missed.push(quiz);
                        }
                    }
                }
            });
        }

        function takeQuiz(quiz) {
            self.quizStarted = true;
            self.activeQuiz = quiz;
            self.activeQuiz.correctAnswers = 0;
            self.activeQuiz.currentAnswer = 0;
            for(let i = 0; i < self.activeQuiz.questions.length; i++){
                let question = self.activeQuiz.questions[i];
                question.options = [];
                let tempArray = [question.option1, question.option2, question.option3, question.option4];
                for(let j = 0; j < tempArray.length; j++){
                    if(tempArray[j] !== "" && tempArray[j] !== null){
                        question.options.push(tempArray[j]);
                    }
                }
                delete question.option1;
                delete question.option2;
                delete question.option3;
                delete question.option4;
            }
        }

        function setCurrentAnswer(index) {
            self.activeQuiz.currentAnswer = index;
        }

        function nextQuestion() {
            if(self.activeQuiz.questions[self.questionIndex].answer == self.activeQuiz.currentAnswer){
                self.activeQuiz.correctAnswers++;
                self.activeQuiz.currentAnswer = 0;
            }

            if(self.questionIndex < self.activeQuiz.questions.length-1){
                self.questionIndex++;
            }else {
                self.activeQuiz.score = Math.round((self.activeQuiz.correctAnswers / self.activeQuiz.questions.length) * 50 + 50);
                DataService.recordTest({
                    quizID: self.activeQuiz.quiz_id,
                    classID: self.activeQuiz.subject.class_id,
                    quizScore: self.activeQuiz.score
                }, function (response) {
                    self.quizStarted = false;
                    self.tabs[2] = true;
                });
            }
        }

        function logout() {
            AuthenticationService.logout();
            $state.go("account.login");
        }
    }
})();