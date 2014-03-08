//All Review desk Routers are global
$(function() {
	try {
		
		App_reviewdesk = new ReviewDeskRouter();
		_reviewdesk_log(App_reviewdesk);


	} catch (err) {

		// Reload the page if app is not ready
		window.location.reload(false);
		return;
	}

	// For infinite page scrolling
	Backbone.history.bind("all", currentReviewDeskRoute)

	Backbone.history.start();
});

var Current_reviewDeskRoute;

function currentReviewDeskRoute(route) {
	Current_reviewDeskRoute = window.location.hash.split("#")[1];
	_reviewdesk_log("in reviewdesk/js : " + Current_reviewDeskRoute);

	try {

		// activateInfiniScroll();

		// if (!Current_WebchatRoute)
		//	return false;

		// if ($('.modal').is(":visible"))
		//	$('.modal').modal('hide');
		
		// showNotyOnTopOfPanel();


	} catch (err) {
	}

}

