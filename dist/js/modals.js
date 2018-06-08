(function(){
var modali = angular.module('modals',[]);
	

	modali.successModal = function(content){
								toastr.options = {
								  "closeButton": true,
								  "debug": false,
								  "newestOnTop": true,
								  "progressBar": true,
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
								Command: toastr["success"](content)

	}

})(); // end