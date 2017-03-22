(function () {
    "use strict";

    angular.module("lindex.class")
        .component("classComp", {
            templateUrl: "app/home/class/class.template.html",
            controller: classController,
            controllerAs: "classVm"
        });
    
        classController.$inject = ["DataService"];
        function classController  ( DataService ) {
            let self = this;

            self.assignQuiz = assignQuiz;
            self.computeTime = computeTime;
            self.readAssign = readAssign;

            (function init() {
                self.headers = ["Subject Code", "Subject Name", "Class and Section", "Options"];
                self.baseLimit = 10;

                let today = new Date();
                today.setDate(today.getDate() + 1);
                today.setHours(8);
                today.setMinutes(0);
                today.setSeconds(0);

                let lower = new Date(today);
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
            })();

            function readAssign(item) {
                let dItem = DataService.duplicate(item);
                self.data = {
                    classInfo: undefined,
                    selectedQuiz: undefined,
                    date: new Date(self.dateOptions.initDate),
                    timeStart: new Date(self.timeLimits.lower),
                };

                if(item.status === 0){
                    self.data.classInfo = item;
                }
                if(item.status === 1){
                    console.log("lower");
                    self.data.classInfo = item;
                    self.data.selectedQuiz = item.quiz[0];
                    self.data.date = new Date(item.quiz[0].schedule);
                    self.data.timeStart = new Date(item.quiz[0].schedule);
                    self.data.timeEnd = new Date(item.quiz[0].schedule);
                    self.data.timeEnd.setMinutes(self.data.timeEnd.getMinutes() + parseInt(self.data.selectedQuiz.duration));
                }self.data.status = item.status;
            }

            function assignQuiz() {
                if(self.data.status === 0 && self.data.classInfo !== undefined && self.data.selectedQuiz !== undefined){
                    self.data.dateString = self.data.date.getFullYear() + '-'
                        + (self.data.date.getMonth()+1) + '-'
                        + self.data.date.getDate() + " "
                        + self.data.date.getHours() + ":"
                        + self.data.date.getMinutes() + ":"
                        + self.data.date.getSeconds();
                    DataService.assignTest(self.data, function (response) {
                        self.data = {};
                    });
                }
                if(self.data.status === 1){
                    DataService.postponeTest(self.data, function (response) {
                       self.data = {};
                    });
                }
            }

            function computeTime() {
                self.data.date.setHours(self.data.timeStart.getHours());
                self.data.date.setMinutes(self.data.timeStart.getMinutes());
                self.data.timeEnd = new Date(self.data.date);
                self.data.timeEnd.setMinutes(self.data.date.getMinutes() + parseInt(self.data.selectedQuiz.duration));
            }
        }
})();