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

            self.func = function (n, str) {
                while (n != 1){
                    if(n%2 === 0){
                        n = n/2;
                    }else {
                        n = 3*n + 1;
                    }
                    str = self.f(str);
                }
                console.log(self.f(self.g(str)) + str[0]);
            };

            self.f = function (str) {
                if(str.length === 0){return "";}
                else if(str.length === 1){return str;}
                else {return self.f}
            };

            self.g = function (str) {
                let i = 0;
                let new_str = "";
                while (i < str.length - 1){
                    new_str = new_str + str[i+1];
                    i = i + 1;
                }
                return new_str;
            };
        }
})();