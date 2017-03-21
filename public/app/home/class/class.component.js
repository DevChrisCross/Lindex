(function () {
    "use strict";

    angular.module("lindex.class")
        .component("classComp", {
            templateUrl: "app/home/class/class.template.html",
            controller: classController,
            controllerAs: "classVm"
        });
    
        classController.$inject = [];
        function classController() {
            let self = this;

            self.assignQuiz = assignQuiz;
            self.computeTime = computeTime;

            (function init() {
                self.headers = ["Subject Code", "Subject Name", "Class and Section", "Options"];

                let today = new Date();
                today.setDate(today.getDate() + 1);

                let lower = new Date(today);
                lower.setHours(8);
                lower.setMinutes(0);

                let upper = new Date(today);
                upper.setHours(20);
                upper.setMinutes(0);

                self.dateOptions = {
                    initDate: new Date(today),
                    minDate: new Date(today)
                };

                self.timeLimits = {
                    lower: lower,
                    upper: upper
                };

                self.data = {
                    classInfo: undefined,
                    selectedQuiz: undefined,
                    date: new Date(self.dateOptions.initDate),
                    timeStart: new Date(self.timeLimits.lower)
                };

                self.data.date.setHours(self.data.timeStart.getHours());
                self.data.date.setMinutes(self.data.timeStart.getMinutes());
            })();

            function assignQuiz() {

            }

            function computeTime() {
                self.data.date.setHours(self.data.timeStart.getHours());
                self.data.date.setMinutes(self.data.timeStart.getMinutes());
                self.data.timeEnd = new Date(self.data.date);
                self.data.timeEnd.setMinutes(self.data.date.getMinutes() + parseInt(self.data.selectedQuiz.duration));
            }
        }
})();