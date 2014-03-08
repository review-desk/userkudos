/**
 * Get handlebar template.
 * 
 * @method getTemplate
 * @param {string}
 *            template_id
 * @param {object}
 *            context
 */
var HANDLEBARS_COMPILED_TEMPLATES = {};
function getTemplate(templateName, context, download) {

	// Check if it is (compiled template) present in templates
	if (HANDLEBARS_COMPILED_TEMPLATES[templateName]) {

		// agent_panel_log(templateName);
		// agent_panel_log(HANDLEBARS_COMPILED_TEMPLATES[templateName]);
		return HANDLEBARS_COMPILED_TEMPLATES[templateName](context);

	}

	// Check if source is available in body
	var source = $('#' + templateName + "-template").html();

	if (source) {

		var template = Handlebars.compile(source);

		// Store it in template
		HANDLEBARS_COMPILED_TEMPLATES[templateName] = template;

		// alert("template");
		return template(context);
	}

}

Handlebars.registerHelper('test', function(email) {
	alert(email);
});

/**
 * Helper function to return the string of gravatar url.
 * 
 * @method get_gravatar_image
 * @param {String}
 *            email to get gravatar url
 * @returns string of the gravatar url
 */
Handlebars.registerHelper('get_gravatar_image', function(email) {

	if (!email)
		email = "";

	var defaultImage = "https://contactuswidget.appspot.com/images/pic.png";
	var gravatatURL = "https://secure.gravatar.com/avatar/" + MD5(email)
			+ '?d=' + encodeURIComponent(defaultImage);
	return new Handlebars.SafeString(gravatatURL);
});
