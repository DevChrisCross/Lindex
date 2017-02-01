/**
 * Created by Chris on 10/01/2017.
 */
(function () {
   "use strict";

   angular.module("lindex", [
       "ngAnimate",
       "ui.bootstrap",
       "ui.router",
       "angularUtils.directives.dirPagination",

       "lindex.account",
       "lindex.home",
       "lindex.dashboard",
       "lindex.question",
       "lindex.quiz",
       "lindex.class"
   ]);
})();