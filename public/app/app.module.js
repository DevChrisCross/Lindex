(function () {
   "use strict";

   angular.module("lindex", [
       "ngAnimate",
       "ui.bootstrap",
       "ui.router",
       "ngStorage",
       "angularUtils.directives.dirPagination",

       "lindex.account",
       "lindex.student",
       "lindex.home",
       "lindex.dashboard",
       "lindex.tags",
       "lindex.question",
       "lindex.quiz",
       "lindex.class"
   ]);
})();