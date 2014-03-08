$(document).ready(function() {

	$("#signup_with_facebook").on("click", function() {

		open_new_window("/facebook.jsp?type=facebook_oauth", "facebook");

		return false;

	});

	$("#signup_with_twitter").on("click", function() {

		open_new_window("/twitter.jsp?type=twitter_oauth", "twitter");

		return false;
	});

});

var newwindow;
function open_new_window(url, window_name) {

	newwindow = window
			.open(url, window_name, 'height=500,width=500,location=1');

	if (window.focus) {
		newwindow.focus();
	}
}

function reviewdesk_popupRegisterCallback(type, data) {

	if (!type || !data)
		return;

	console.log(data);
	newwindow.close();

	if (type == "facebook") {
		enable_facebook_form(data);
		return;
	}

	else if (type == "twitter") {
		enable_twitter_form(data);
		return;
	}
}

function enable_facebook_form(data) {
	$("form").addClass("no-display");
	$("#facebook_register_form").removeClass("no-display");
	$("#facebook_register_form").find("#user_id").val(data.email);
	$("#facebook_register_form").find("#user_name").val(data.name);
	$("#facebook_register_form").find("#facebook_id").val(data.id);

	if (!data.data || data.data.length < 1)
		return;

	for (i = 0; i < data.data.length; i++) {

		$("#facebook_register_form").find("#facebook_pages").append(
				"<option value='" + data.data[i].id + "'>" + data.data[i].name
						+ "</option>");
	}

}

function enable_twitter_form(data) {

	$("form").addClass("no-display");
	$("#twitter_register_form").removeClass("no-display");
	$("#twitter_register_form").find("#user_id").value(data.email);
	$("#twitter_register_form").find("#user_name").value(data.name);
	$("#twitter_register_form").find("#twitter_id").value(data.id);

}