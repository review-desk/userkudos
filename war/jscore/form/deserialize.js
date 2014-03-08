/**
 * Deserialize.js It deserializes the form with the data, it is used while
 * editing data, it pre fills the form with the data to be edited.
 * 
 * deserializeForm(data, form) function iterates through data and finds the
 * element with respect to the name attribute of the field to fill the basic
 * fields i.e., input field, check box, select filed. This function includes
 * functionalities to deserialize the fields designed with custom functionality.
 * 
 * @param data
 *            data to be filled in form
 * @param form
 *            html form element
 */
function deserializeForm(data, form) {
	
	if(form.hasClass("alias_userids") && data.registeredUserID != undefined)
	{
		var alias = data.alias;
		var aliasArray = alias.split(",");
		var aliasJSON = {};

		for(var i in aliasArray)
		{
			aliasJSON[i] = aliasArray[i];
		}
		
		data = aliasJSON;
	}
	
    // Iterates through the data(which is to be populated in the form) and finds
    // field elements in the form based on the name of the field and populates
    // it. i represents key of the map, el is the value corresponding to key
    $.each(data, function(i, el) {

        // Finds the element with name attribute same as the key in the JSON data
        var fel = form.find('*[name="' + i + '"]'),
        type = "",
        tag = ""; 	
    
        // If Fields exist with the field name, process the
        // fields to fill the data in the form
        if (fel.length > 0) {

        
            // Reads the tag name of the field
            tag = fel[0].tagName.toLowerCase();
 	
        	if(i=="or_rules"){
	    	    
                // Iterates through JSON array of rules, to fill a chained select
                $.each(el, function(index, data) {
                	
                       // Finds the or rule html element
                    var or_rule_element = ($(form).find('.or_rule'));
                                            
                    if (index > 0) {
                    	
                        var or_rule_parent_element = $(or_rule_element).parent();                      
                         
                        or_rule_element  = $(getTemplate("or-rules-add", COMPLETE_DATA)).find('tr').clone();
                        $(or_rule_element).find("i.rule-multiple-remove").css("display", "inline-block");
                        
                        head.js(LIB_PATH + 'lib/clickdesk.jquery.chained.min.js', function() {
       
                            //or rules
                            $('#or_operations', or_rule_element).chained($('#or_rules_LHS', or_rule_element));
                            $("#or_rules_RHS", or_rule_element).chained($('#or_rules_LHS', or_rule_element));
                            $("#or_rules_time_based",  or_rule_element).chained($('#or_rules_LHS', or_rule_element));
                            $("#or_rules_time_based_value",  or_rule_element).chained($('#or_rules_time_based', or_rule_element));
                            $(or_rule_parent_element).append(or_rule_element);                         
                            
                        });
                        
                    }
                  //or rules
                  $.each(data, function(i, value) {
                  	         		
                      var or_rule_input_element = rulesDeserialize(data, or_rule_element);
                      var or_rule_option_element = $(or_rule_input_element).children();
                      
                      $.each(or_rule_option_element, function(index, element) {                   	 
                            if ($(element).attr('value') == value) {
                              $(element).attr("selected", "selected");
                              $(or_rule_input_element).trigger("change");
                              return;
                         }       
                        
                      });                  
                      
                  });
                                 
                });                
    		
    	}	
    	else if(i=="and_rules"){
	    
               // Iterates through JSON array of rules, to fill a chained select
                $.each(el, function(index, data) {
                	
                	  // Finds the and rule html element
                    var and_rule_element = ($(form).find('.and_rule'));
                                              
                     if (index > 0) {
                    	
                        var and_rule_parent_element = $(and_rule_element).parent();
                                                
                        and_rule_element = $(getTemplate("and-rules-add", COMPLETE_DATA)).find('tr').clone();
                        $(and_rule_element).find("i.rule-multiple-remove").css("display", "inline-block");           
                          
                        head.js(LIB_PATH + 'lib/clickdesk.jquery.chained.min.js', function() {
     
                            //and rules
                        	 $('#and_operations', and_rule_element).chained($('#and_rules_LHS', and_rule_element));
                             $("#and_rules_RHS", and_rule_element).chained($('#and_rules_LHS', and_rule_element));
                             $("#and_rules_time_based", and_rule_element).chained($('#and_rules_LHS', and_rule_element));
                             $("#and_rules_time_based_value", and_rule_element).chained($('#and_rules_time_based', and_rule_element));
                             $(and_rule_parent_element).append(and_rule_element);
                                                 
                        });
                        
                    }      
                    
                  //and rules
                  $.each(data, function(i, value) {
                         
                        var and_rule_input_element = rulesDeserialize(data, and_rule_element);                                            
                        var and_rule_option_element = $(and_rule_input_element).children();                        
        	
                        $.each(and_rule_option_element, function(index, element) {
                        	
                           if ($(element).attr('value') == value) {
                              $(element).attr("selected", "selected");
                               $(and_rule_input_element).trigger("change");
                              return;
                            }    
                          
                        });                                          
                    });                                 
                });   		 		
    	}
    	   	
            // If tag of the element is of type select of
            // textarea fills the data
    	else if ( tag == "select" || tag == "textarea") {
            	   	
            	  // Finds the rule html element
                var text_elememt = $(fel).val(el);
                
               	if(fel.hasClass('description')){
            		
            		var description = $(form, el).find('textarea').val();
            		$(form, el).find('textarea').val(description.replace( /<br\/>/g,"\r\n"));
            		
            	}

                // ...
            	text_elememt;
                
            }

            /*
			 * If tag of the field is input type, checks whether
			 * input field is a date field, to generate date
			 * based on epoch time and fills in the input
			 * field(date fields uses bootstrap datepicker in
			 * the fileds)
			 */
            else if (tag == "input") { 
                type = $(fel[0]).attr("type");

                /*
				 * If field has class date, calculates the date
				 * and fills in the input field, formats with
				 * datepicker
				 */
                if (fel.hasClass('date')) {
                    fel.val(new Date(el * 1000).format('mm-dd-yyyy'));

                    fel.datepicker({
                        format: 'mm-dd-yyyy',
                        });
                }

                /*
				 * If type of the field is text of password or
				 * hidden fills the data
				 */
                else if (type == "text" || type == "password" || type == "hidden" || type == "number") {
                    fel.val(el);
                } else if (tag == "select") {
                    fel.val(el).trigger('change');
                }

                // Checks the checkbox if value of the filed is true
                else if (type == "checkbox") {
                    if (el) {
                        if (el == 'true' || el == true || el == 'yes')
                            fel.attr("checked", "checked");

                    }
                }

                /*
				 * If type of the field is "radio", then filters
				 * the field based on the value and checks it
				 * accordingly
				 */
                else if (type == "radio") {
                    fel.filter('[value="' + el + '"]').attr("checked", "checked");
                }
            }

            /*
			 * Deserialize tags, tags are represented by list
			 * elements prepended the respective input field. If
			 * field has class tagsinput and tag is ul and
			 * attribute of the field is contacts, then is field
			 * is considered as the tags field, it de-serializes
			 * the contact tags
			 */
            else if (fel.hasClass('tagsinput') && tag == "ul" && fel.attr('name') == 'contacts') {

                // Iterates through contacts to create a tag element for each contact
                $.each(el, function(index, contact) {
                    var tag_name;

                    /*
					 * tag_id represents
					 * contact.id, values of the
					 * tags(li) are contact ids
					 */
                    var tag_id = contact.id;

                    /*
					 * tag_name represent the
					 * name of the contact
					 * first_name and last_name
					 */
                    tag_name = getPropertyValue(contact.properties, "first_name") + " " + getPropertyValue(contact.properties, "last_name");

                    /*
					 * Creates a tag for each
					 * contact and appends to
					 * tags input field with
					 * class "tagsinput", tag
					 * value is contact id and
					 * name of li element is
					 * contact full name
					 */
                    $('.tagsinput', form).append('<li class="tag" data="' + tag_id + '" class="tag"  style="display: inline-block; ">' + tag_name + '<a class="close" id="remove_tag">&times</a></li>');
                });
            }

            /*
			 * Deserialize multiselect, select box to select
			 * multiple values, used for contact custom views.
			 * This is for the fields which uses
			 * jquery.multi-select.js, it provides multiSelect()
			 * function to fill the select
			 */
            else if (fel.hasClass('multiSelect') && tag == 'ul') {

                /*
				 * Iterates through options of the select and
				 * call multiSelect function to select the
				 * option
				 */
                $.each(el, function(index, option) {
                    $('#multipleSelect', form).multiSelect('select', option);
                });
            }

            /*
			 * Deserialize chained select, chained select is
			 * used for creating filters. It is logical chaining
			 * of the input fields, If form contains an element
			 * with class "chainedSelect" the deserializes the
			 * chained select. Chained select fields can be
			 * multiple, if value include multiple rules a
			 * chained select field should is added to the form
			 * and populates with the value
			 */
            else if (fel.hasClass('chainedSelect')) {
                // Iterates through JSON array of rules, to fill a chained select
                $.each(el, function(index, data) {

                    // Finds the rule html element
                    var rule_element = ($(form).find('.chained'))[0];

                    /*
					 * If more than one rule clones the fields and relate with jquery.chained.js
					 */
                    if (index > 0) {
                        var parent_element = $(rule_element).parent();

                        /*
						 * Gets the Template for input and select fields
						 */
                        rule_element = $(getTemplate("filter-contacts", {})).find('tr').clone();

                        // Add remove icon for rule
                        $(rule_element).find("i.filter-contacts-multiple-remove").css("display", "inline-block");

                        // Loads jquery chained plugin for chaining the input fields
                        head.js(LIB_PATH + 'lib/agile.jquery.chained.min.js', function() {

					       /* Chains dependencies of input fields with jquery.chained.js based on the rule element */
                            $('#condition', rule_element).chained($('#LHS', rule_element));
                            $("#RHS", rule_element).chained($('#LHS', rule_element));
                            $('#RHS-NEW', rule_element).chained($('#condition', rule_element));

                            $(parent_element).append(rule_element);
                        });
                    }

                    $.each(data, function(i, value) {
                        var input_element = ($(rule_element).find('*[name="' + i + '"]').children())[0];

                        // If input field set is value for input field, checks it chained select
                        // elements date fields should be filled with date
                        if (input_element.tagName.toLowerCase() == "input") {

                            // Fills date in to fields and initialize datepicker on the field
                            if ($(input_element).hasClass('date')) {
                                $(input_element).val(new Date(value).format('mm-dd-yyyy'));
                                $(input_element).datepicker({
                                    format: 'mm-dd-yyyy',
                                    });
                                return;
                            }
                            $(input_element).val(value);
                            return;
                        }

                        // Gets related select field
                        var option_element = $(input_element).children()

                        // Iterates through options in select field
                        $.each(option_element, function(index, element) {
                        	
                            // Selects the option
                            if ($(element).attr('value') == value) {
                                $(element).attr("selected", "selected");
                                $(input_element).trigger("change");
                                return;
                            }
                        });
                    });
                });
                } 
                else if(fel.hasClass("chainedSelect_helpdesk"))
                {
                	
                    // Iterates through JSON array of rules, to fill a chained select
                    $.each(el, function(index, data) {
                    	
                        // Finds the rule html element
                        var rule_element = ($(form).find('.chained_helpdesk'))[0];
                        
                        if (index > 0) {
                        	//rule_element = macroDeserialize(data, rule_element)
                            var parent_element = $(rule_element).parent();
                            rule_element = $(getTemplate("macro-add-edit", {})).find('tr').clone();
                            $(rule_element).find("i.macro-multiple-remove").css("display", "inline-block");
                            head.js(LIB_PATH + 'lib/clickdesk.jquery.chained.min.js', function() {

                                $('#select_group', rule_element).chained($('#LHS', rule_element));
                                $("#Middle", rule_element).chained($('#LHS', rule_element));
                                $('#RHS', rule_element).chained($('#Middle', rule_element));
                                $(parent_element).append(rule_element);
                            });
                        }

                        $.each(data, function(i, value) {
                            var input_element = macroDeserialize(data, rule_element);

                            var option_element = $(input_element).children();
                             
                            $.each(option_element, function(index, element) {

                                if ($(element).attr('value') == value) {
                                    $(element).attr("selected", "selected");
                                    $(input_element).trigger("change");
                                    return;
                                }
                            });
                        });
                    });
             
                }else if(fel.hasClass("chainedSelect_automations")){
                	                 
                    // Iterates through JSON array of rules, to fill a chained select
                    $.each(el, function(index, data) {
                    	                                                                                 
                        // Finds the actions html element
                        var rule_element = ($(form).find('.automation_chained_actions'))[0];
                                                    
                        if (index > 0) {
                        	
                            var parent_element = $(rule_element).parent();
                            
                            rule_element = $(getTemplate("automation-add-edit", {})).find('#automation_actions').clone();                           
                            $(rule_element).find("i.automation-multiple-remove").css("display", "inline-block");
                            
                           
                            head.js(LIB_PATH + 'lib/clickdesk.jquery.chained.min.js', function() {

                            	//actions
                                $('#select_group', rule_element).chained($('#LHS', rule_element));
                                $("#Middle", rule_element).chained($('#LHS', rule_element));
                                $('#RHS', rule_element).chained($('#Middle', rule_element));
                                $(parent_element).append(rule_element);
                                     
                            });
                            
                        }

                        //actions
                        $.each(data, function(i, value) {
                        	
                            var input_element = automationDeserialize(data, rule_element);

                            var option_element = $(input_element).children();

                            $.each(option_element, function(index, element) {
                            	
                                 if ($(element).attr('value') == value) {
                                    $(element).attr("selected", "selected");
                                    $(input_element).trigger("change");
                                   return;
                                }
                            });
                            
                            
                        });                    
                        
                    });
                }
        	}
        if(form.hasClass("alias_userids"))
        {		
        		if(el.length == 0)
        			return true;
        		
        	    if(data.alias == el || data.registeredUserID == el)
        	    	return true;
        	    
                // Finds the actions html element
                var tr_element = ($(form).find('.chained-alias-userid'))[0];
                
                if(i == 0)
                {
                    $(tr_element).find("#aliasuserid").val(el);
                    return true;
                }    

                var parent_element = $(tr_element).parent();
                    
                tr_element = $(getTemplate("admin-settings-alias", {})).find('.chained-alias-userid').clone();
                
                $(tr_element).find("input[data='aliasuserid']").attr(
                {
                	id :"aliasuserid" + i,
                	name: "aliasuserid" + i
                });
                
                $(tr_element).find("i.aliasuserid-multiple-remove").css("display", "inline-block");
                   
                head.js(LIB_PATH + 'lib/clickdesk.jquery.chained.min.js', function() {
                        $(parent_element).append(tr_element);
                    });
                
                $(tr_element).find("[data='aliasuserid']").val(el);
        }
    });
}

// To deserialize multiple forms in content
/**
 * Desrializes the multiple forms, It calls deserializeForm for each form in the
 * element passed. Called from base-model when there are multiple forms with
 * single save option.
 * 
 * @param data
 *            data to be filled in forms
 * @param form
 *            html element with multiple forms
 */
function deserializeMultipleForms(data, form) {
    // Iterates through each form element in the form and calls
    // deseriazlie of each form with respective data element
    // based on key(i.e., name of the form)
    $.each(form, function(index, form_element) {
        // Reads the name of the form element
        var key = $(form_element).attr('name');

        // If form have attribute name deserializes with particular object
        if (key && data[key]) {
            deserializeForm(data[key], $(form_element));
        }

        // If data with the key is not available then calls
        // deserialize on the data directly, since form values
        // can be directly available in the JSON object
        else
            deserializeForm(data, $(form_element));
    });
}