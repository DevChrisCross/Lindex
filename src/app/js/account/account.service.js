/**
 * Created by Chris on 13/01/2017.
 */
(function () {
    "use strict";

    angular.module("lindex.account")
        .factory("accountService", accountService);

        accountService.$inject = [];
        function accountService() {
            let _user = {
                username: "",
                name: ""
            };

            let setUsername = function (username) {
                _user.username = username;
            };

            let getUsername = function () {
                return _user.username;
            };

            let setName = function (name) {
                _user.username = name;
            };

            let getName = function () {
                return _user.username;
            };

            return{
                setName: setName,
                getName: getName
            };

        }
})();