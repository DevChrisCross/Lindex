(function () {
    "use strict";

    angular.module("lindex")
        .factory("AuthenticationService", AuthenticationService);

    AuthenticationService.$inject = ["$http", "$localStorage", "$rootScope"];
    function AuthenticationService  ( $http ,  $localStorage ,  $rootScope ) {
        let baseAPI = "http://localhost/lindex/api/";
        let self = {};

        self.login = login;
        self.logout = logout;
        self.encodeToken = encodeToken;
        self.decodeToken = decodeToken;

        return self;

        function login(data, callback) {
            $http.post(baseAPI + "professor/check.php", data)
                .then(function (response) {
                    let token = undefined;
                    if (response.data.length !== 0) {
                        console.log(response.data[0]);
                        token = self.encodeToken(response.data[0]);
                        $localStorage.currentUser = { token: token };
                        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                    }callback(token);
                });
        }

        function logout() {
            $rootScope.user = undefined;
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }

        function encodeToken(data) {
            let oHeader = {alg: 'HS256', typ: 'JWT'};
            let oPayload = JSON.parse(JSON.stringify(data));
            let sHeader = JSON.stringify(oHeader);
            let sPayload = JSON.stringify(oPayload);
            let token = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, {utf8: "secret"});
            return token;
        }

        function decodeToken(token) {
            let headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[0]));
            let payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
            return payloadObj;
        }
    }
})();