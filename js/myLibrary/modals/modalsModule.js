(function() {
    "use strict";
    var modali = angular.module('modalsLibraryModule', []);

	/*
	 type je iz skupa {'success, info, error, warning,'}
	 */

    modali.factory('ModalsFactory', ['$log', function ($log) {

        var factory = {};
        factory.toaster = function (type, content) {
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": true,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "slideDown",
                "hideMethod": "slideUp"
            }
            Command: toastr[type](content)

        };


        return factory;


    }]); // end

})();