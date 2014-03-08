/**
 * 
 * validate.js is used to validate the forms in the application, isValidFom
 * method validates the form element
 * 
 * @param form
 * @returns
 */
function isValidForm(form) {
	// Credit card validation to check card is valid for next 3 months
	jQuery.validator
			.addMethod(
					"atleastThreeMonths",
					function(value, element) {

						// Gets the exp_month field because expiry should be
						// checked both on month and year
						var month = $(element).siblings('select.exp_month')
								.val(), year = value;

						console.log("month = " + month);
						
						// date selected
						var date = new Date().setFullYear(year, month - 1);

						// Get number of milliseconds per day
						var one_day = 1000 * 60 * 60 * 24;

						// Calculates number of days left from the current date,
						// if number of days are greater than 90 then returns
						// true
						return this.optional(element)
								|| (((date - new Date().getTime()) / one_day) > 90);
					}, "Card should be atleast 3 months valid");
	jQuery.validator.addMethod("donotAllowComma", function(value, element) {
		// gets the input value
		var inputvalue = $(element).val();
		var patt = /,/g;
		// if there is comma in the input value returns true
		var result = patt.test(inputvalue);
		return this.optional(element) || (!result);
	}, "Multiple values are not allowed");

	jQuery.validator
			.addMethod(
					"phoneNumber",
					function(value, element) {
						// gets the input value
						var inputvalue = $(element).val();
						var phoneRegExp = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;
						var numbersLength = inputvalue.split("").length;

						// if there is comma in the input value returns true
						var result = (10 <= numbersLength
								&& numbersLength <= 20 && phoneRegExp
								.test(inputvalue));
						return this.optional(element) || (result);
					}, "Enter a valid Phone Number");

	jQuery.validator
			.addMethod(
					"agentLevels",
					function(value, element) {
						// Gets the input value
						var inputvalue = $(element).val();
						return this.optional(element)
								|| ((inputvalue == "1") ? true
										: isEnterpriseCustomer());

					},
					"This feature is available for Enterprise Plan users only. <a href='#subscribe'>Upgrade</a> now.");

	$(form)
			.validate(
					{
						rules : {
							atleastThreeMonths : true,
							im_id : {
								required : function(element) {
									return $('[name="im_network"]').val() != "webchat";
								},
								email : {
									depends : function(element) {
										return $('[name="im_network"]').val() == "gtalk";
									}
								}
							}
						},
						debug : true,
						errorElement : 'span',
						ignore : [],
						errorClass : 'help-inline',

						// Higlights the field and addsClass error if validation
						// failed
						highlight : function(element, errorClass) {
							$(element).closest(".control-group").find(
									".controls").find(
									"span.manual-email-validation").remove();
							$(element).closest(".control-group").addClass(
									'error');
						},

						// Unhiglights and remove error field if validation
						// check passes
						unhighlight : function(element, errorClass) {
							$(element).closest(".control-group").removeClass(
									'error');
						},

						invalidHandler : function(form, validator) {
							var errors = validator.numberOfInvalids();

							var invalidElements = validator.errorList;
							// For Agent Tab mechanism validation message
							if ($(this).attr('name') == "add-agent-new-form") {
								getAgentFormErrorTab(this, invalidElements);
							}
							if (!($(form.currentTarget).find(
									'.form-actions #error-info')
									.hasClass('error-info'))) {
								var $save_info = $('<div style="color:#B94A48; font-size:14px" class="error-info" id="error-info"><p><i>Something went wrong with your details. Please correct the errors above and try again.</p></i></div>');
								$(form.currentTarget).find('.form-actions')
										.append($save_info);
								setTimeout(function() {
									$save_info.remove();
								}, 8000);
							}

						}

					});

	// Return valid of invalid, to stop from saving the data
	if ($(form).attr("id") == "domainSettingsForm") {
		if (!updateDomElement($("#domain_name"), "alphaNumeric",
				"Only alphanumeric characters are allowed."))
			return false;
	}

	return $(form).valid();

}

$(function() {

	// Add Blur event to email fields
	$('.email').off().on(
			'blur',
			function(e) {
				
				if($(this).attr("data") == "aliasuserid")
				  return;
				
				return updateDomElement($(this), "email",
						"Please enter a valid email address.");
			});

	// Add Blur event to level fields
	$('.agentLevels')
			.off()
			.on(
					'blur',
					function(e) {
						return updateDomElement(
								$(this),
								"level",
								"This feature is available for Enterprise Plan users only. <a href='#subscribe'>Upgrade</a> now.");

					});

	$('.webChatDomainName').off().on('blur', function(e) {
		// return updateDomElement($(this), "alphaNumeric", "Only alphanumeric
		// characters are allowed.");
	});

});

function updateDomElement(ele, type, errorMessage) {
	var value = $(ele).val();
	var result = false;

	// Email Regex pattern
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,9}$/;
	var alphaNumericRegExp = /^[a-z0-9]+$/i;

	if (type == "email")
		result = emailPattern.test(value);
	else if (type == "level")
		result = (value == "1") ? true : isEnterpriseCustomer();
	else if (type == "alphaNumeric")
		result = (alphaNumericRegExp.test(value));

	if (result) {
		$(ele).closest(".control-group").removeClass('error');
		$(ele).closest(".control-group").find(".controls").find(
				"span.manual-email-validation").remove();
	} else {
		if ($(ele).closest(".control-group").find(".controls").has(
				'span.help-inline').length == 0) {
			$(ele).closest(".control-group").addClass('error');
			if (type == "alphaNumeric")
				$(ele)
						.closest(".control-group")
						.find('.controls')
						.append(
								'<span for="email" generated="true" class="help-inline manual-email-validation" style="color:#df382c;">'
										+ errorMessage + '</span>');
			else
				$(ele)
						.closest(".control-group")
						.find('.controls')
						.find('input, select')
						.after(
								'<span for="email" generated="true" class="help-inline manual-email-validation" style="">'
										+ errorMessage + '</span>');
		}
	}

	return result;

}

function isEnterpriseCustomer() {

	try {
		var plan = USER_BILLING_PREFS.user_plan.toLowerCase();
		if (plan.indexOf("enterprise") == 0 || plan.indexOf("super") == 0)
			return true;

	} catch (e) {
	}

	return false;

}

function isValid(formId) {
	$("#" + formId).validate();
	return $("#" + formId).valid();
}

function getAgentFormErrorTab(form, invalidElements) {

	var AgentProfile_Fields = [ 'agent_name', 'nick_name', 'email',
			'agent_password' ];
	var ImNetwork_Fields = [ 'im_network', 'im_id' ];
	var Advanced_Fields = [ 'priority', 'max_im_bots', 'phone_type',
			'phone_number' ];
	var agent_profile = false, im_nw = false, advanced_options = false;

	$.each(invalidElements, function(index, object) {
		var element_name = $(object.element).attr('name');

		if ($.inArray(element_name, AgentProfile_Fields) != -1)
			agent_profile = true;
		else if ($.inArray(element_name, ImNetwork_Fields) != -1)
			im_nw = true;
		else if ($.inArray(element_name, Advanced_Fields) != -1)
			advanced_options = true;
	});

	if (agent_profile) {
		$(form).find('li.agent-profile-tab').find('a[href="#agent-profile"]').trigger('click');
	} else if (im_nw) {
		$(form).find('li.im-network-tab').find('a[href="#agent-im-network"]').trigger('click');
	} else if (advanced_options) {
		$(form).find('li.agent-advanced-tab').find('a[href="#agent-advanced"]').trigger('click');
	}

}