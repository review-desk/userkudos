/* !JSCore */
/**
 * Base_Model_View represents view specified by backbone js
 * (http://backbonejs.org/#View), It is view backed by a models, Base_Model_View
 * binds events(click on ".save" and ".delete" html elements) which represents
 * view with logical actions i.e., actions can defined to perform on an event.
 * This binds a view backbone model to view's render function on change event of
 * model, model data is show in the view (used handlebars js to fill model data
 * to template), whenever there is a change in model data, view is updated with
 * new data, since change on model is binded to render function of the view.
 * <p>
 * While creating new Base_Model_View options can be passed, so view is
 * initialized based on the options. Options processed are
 * <p>
 * data : Data should be sent in JSON format (backbone model is created based on
 * data sent).
 * <p>
 * <p>
 * model : Backbone model should be sent.
 * <p>
 * <p>
 * url : Represents url property of the model.
 * <p>
 * <p>
 * isNew : To specify model model needs to be downloaded or not.
 * <p>
 * <p>
 * Window : Specifies which window to navigate after saving the form
 * <p>
 * <p>
 * reload : Boolean value, to specify whether to reload the page after save
 * <p>
 * $el represents the html element of view
 * </p>
 */
var Base_Model_View = Backbone.View
		.extend({

			/*
			 * Events defined on the view and related function(defines action to
			 * be performed on event). ".save" and ".delete" represents html
			 * elements in current view
			 */
			events : {
				"click .save" : "save",
				"click .delete" : "deleteItem"
			},

			/**
			 * Sets options to view object(this.options), these options are
			 * passed when creating a view, in initialize function options are
			 * set to current view object. Also binds functions and model data
			 * to views.
			 */
			initialize : function() {
				/*
				 * Binds functions to current view object, every function that
				 * uses current view "this" should be bind to view
				 * object("this").
				 */
				_.bindAll(this, 'render', 'save', 'deleteItem');

				/*
				 * If data is passed as an option to create a view, then
				 * backbone model object is created with data sent, data is
				 * represented as backbone model and bind to view.
				 */
				if (this.options.data != undefined)
					this.model = new Backbone.Model(this.options.data);
				/*
				 * If backbone model is passed as option the model is set to
				 * view
				 */
				else if (this.options.model)
					this.model = this.options.model;
				else
					this.model = new Backbone.Model({});

				/*
				 * Binds render function to change event on the view object
				 * which includes model object, whenever model is changed render
				 * is called to update the view.
				 */
				this.model.bind("change", this.render, this);

				/*
				 * Sets URL to backbone model, if url is passed when creating a
				 * view. URL specified is used to fetch, save the model
				 */
				if (this.options.url) {
					this.model.url = this.options.url;
				}

				/*
				 * If "isNew" in options is true, model is not downloaded. which
				 * represents no model data needs to be shown in the view, but
				 * can be used to save data as url is set for model with no data
				 */
				// if (!this.options.isNew)
				if ((!this.options.isNew)
						&& $.isEmptyObject(this.model.toJSON())) {
					/*
					 * Stores view object in temp variable, to be used in
					 * success back for fetch to call render
					 */

					var that = this;

					/*
					 * Fetches model from the url property set, on success
					 * forces render to execute to show the data fetched in
					 * view.
					 */
					this.model.fetch({
						success : function(data) {
							/*
							 * Used true argument to render (forcing render to
							 * execute and show view.), which represent data is
							 * downloaded from server, If render called out
							 * "true" argument then loading image is show
							 * instead of showing data (because Showing view
							 * without downloading data causes flash effect on
							 * page, since on change in model i.e., data fetched
							 * render is called again)
							 */
							// console.log("fetched");
							if ($.isEmptyObject(data.attributes))
								that.render(true);
						}
					});
				}
			},

			/**
			 * Defines action for click event on html element with class
			 * ".delete" in current view object, which sends delete request to
			 * server(to URL set to model in initialize function)
			 */
			deleteItem : function(e) {

				// Prevents the default behaviour
				e.preventDefault();

				/*
				 * Sends delete request, and reloads view on success
				 */
				// Clone the model for future usage
				var that = this;
				if (this.options.template
						&& this.options.template != "department") {
					if (window
							.confirm("Are you sure! you want to delete this item?")) {
						that.destroyModel(e);
						return;
					}
					return;
				}
				var template = getTemplate('delete-dept-warning');
				$('#verifying_agent').html(template);
				// Shows warning modal
				$("#verifying_agent").modal('show');
				$("#confirm-delete-department").die().live("click",
						function(e) {
							e.preventDefault();
							// Hides modal
							$("#verifying_agent").modal('hide');

							that.destroyModel(e);
							return;
						});
				return;

			},
			destroyModel : function(e) {

				e.preventDefault();

				var that = this;

				this.model.destroy({
					success : function(model, response) {

						var navigate = that.options.navigate;
						if (navigate) {
							if (navigate == 'back') {
								window.history.back();
								return;
							}

							Backbone.history.navigate(navigate, {
								trigger : true
							});
							return;
						}

						location.reload(true);
					}
				});

			},
			/**
			 * Defines action to be performed for click event on HTML element
			 * with class ".save" in current view/template, this can be used to
			 * save the model data in the view representing a form i.e., saveS
			 * the data in form, to the URL set in model.
			 */
			save : function(e) {
				e.preventDefault();

				/*
				 * Gets the form id from the view, this.el represents html
				 * element of the view.
				 */
				var formId = $(this.el).find('form').attr('id');

				// Represents form element
				var $form = $('#' + formId);

				// Returns, if the save button has disabled attribute
				if ($(this.el).find(".save").attr('disabled')
						|| $form.find(".save").attr('disabled'))
					return;

				// Disables save button to prevent multiple click event issues
				$("#content").find('.save').attr('disabled', 'disabled');
				$form.find('.save').attr('disabled', 'disabled');

				// Represents validations result of the form, and json
				// represents serialized data in the form
				var isValid, json;

				/**
				 * If view contains multiple forms, then data are all the forms
				 * in the view are serialized in to a JSON object, each form
				 * data is added to json object with key name attribute of the
				 * form as follows
				 * 
				 * <pre>
				 * {
				 * primary : {key:value ....} // Data of form with name &quot;primary&quot;
				 * secondary : {key : value} // Data for 2nd for with name secondary
				 * key1 : value1 // For forms with out a name, values
				 * //are set directly in JSON with field name
				 * }
				 * </pre>
				 */
				if ($(this.el).find('form').length > 1) {
					// Initialize variable json as a map
					json = {};

					/*
					 * Iterates through the forms in the view (this.el), each
					 * form is validated, if a form is not valid, isValid
					 * variable is set and returned. If form is valid then form
					 * data is serialized, and set in the JSON object with key
					 * as name of the form
					 */
					$.each($(this.el).find('form'),
							function(index, formelement) {

								/*
								 * If any form in multiple forms are not valid
								 * then returns, setting a flag form data is
								 * invalid
								 */
								if (!isValidForm($(formelement))) {
									isValid = false;
									return;
								}

								/*
								 * Form id and Mame of the form is read,
								 * required to serialize and set in JSON
								 */
								var form_id = $(formelement).attr('id');
								var name = $(formelement).attr('name');

								/*
								 * If name of the form is defined, set the
								 * serialized data in to JSON object with form
								 * name as key
								 */
								if (name) {

									json[name] = serializeForm(form_id);

								}
								/*
								 * If form name is not defined the set the
								 * serialized values to json, with filed names
								 * as key for the value
								 */
								else {
									$.each(serializeForm(form_id), function(
											key, value) {
										json[key] = value;
									});
								}
							});
				}

				/*
				 * Check isValid flag for validity(which is set in processing
				 * multiple forms), or checks validity of single form
				 */
				if (isValid == false || !isValidForm($form)) {

					// Removes disabled attribute of save button
					$("#content").find('.save').removeAttr('disabled',
							'disabled');
					$form.find('.save').removeAttr('disabled', 'disabled');
					return;
				}

				// Clears all the fields in the form before saving
				this.model.clear({
					silent : true
				});
				/*
				 * If variable json is not defined i.e., view does not contacts
				 * multiple forms, so read data from single form
				 */
				if (!json) {
					json = serializeForm(formId);
				}
				/*
				 * Saves model data, (silent : true} as argument do not trigger
				 * change view so view is not reset.
				 */
				this.model.set(json, {
					silent : true
				});

				var navigate = this.options.navigate;
				var reload = this.options.reload;
				var success_callback = this.options.success_callback;

				var add_success_id = this.options.add_success_id;

				// Store Modal Id
				var modal = this.options.modal;

				// Loading while saving
				$save_info = $('<div style="display:inline-block"><img src="img/1-0.gif" height="15px" width="15px"></img></div>');
				$(".form-actions", this.el).append($save_info);
				$save_info.show();
				// ClickDesk needs form post
				this.model.sync = function(method, model, options) {
					// console.log("I sync");
					// console.log(method);
					return $
							.ajax({
								type : (method.toLowerCase() == 'update') ? 'PUT'
										: 'POST',
								contentType : 'application/x-www-form-urlencoded',
								beforeSend : function(xhr) {
									xhr.setRequestHeader(
											'X-HTTP-Method-Override', 'POST');
								},
								dataType : 'json',
								data : model.toJSON(),
								url : model.url,
								success : function(responseText) {

									// Show noty
									try {
										showSuccessNoty(
												"success",
												"Your settings has been saved successfully.",
												"top");

										// adding tags to agile
										addTagsToAgile(Current_Route);

									} catch (err) {
									}

									if (responseText && add_success_id) {
										try {
											add_success_id = responseText.id;
										} catch (e) {
										}
									}
									options.success();
								},
								error : function(data) {

									// console.log(data);

									// Hide loading on error
									$save_info.hide();

									// Removes disabled attribute of save button
									$("#content").find('.save').removeAttr(
											'disabled', 'disabled');
									$form.find('.save').removeAttr('disabled',
											'disabled');

									// Show cause of error in saving
									$save_info = $('<div style="display:inline-block"><small><p style="color:#B94A48; font-size:14px"><i>'
											+ data.responseText
											+ '</i></p></small></div>');

									// Appends error info to form actions
									// block.
									$(".form-actions", this.el).append(
											$save_info);

									// Hides the error message after 3
									// seconds
									$save_info.show().delay(3000).hide(1);
								}
							});
				}

				// Calls save on the model
				this.model
						.save(
								[],
								{
									/*
									 * Wait for the server before setting the
									 * new attributes on the model, to trigger
									 * change
									 */
									wait : true,
									/*
									 * On save success, performs the actions as
									 * specified in the options set when
									 * creating an view
									 */
									success : function(model) {
										// Removes disabled attribute of save
										// button
										$("#content").find('.save').removeAttr(
												'disabled', 'disabled');
										$form.find('.save').removeAttr(
												'disabled', 'disabled');

										// Reload the current page
										if (reload)
											location.reload(true);
										else if (success_callback)
											success_callback(model);

										if (navigate) {
											/*
											 * If window option is 'back'
											 * navigate to previews page
											 */
											if (navigate == 'back') {
												window.history.back();
												return;
											}
											// Else navigate to page set in
											// window attribute
											else {
												if (add_success_id)
													navigate += add_success_id;

												Backbone.history.navigate(
														navigate, {
															trigger : true
														});
												return;

											}

											// Reset each element
											$form.each(function() {
												this.reset();
											});

											// Hide modal if enabled
											if (modal) {
												$(modal).modal('hide');
											}
										} else {
											// Hide loading on error
											// console.log($save_info);
											$save_info.hide();
											/*
											 * Appends success message to form
											 * actions block in form, if window
											 * option is not set for view
											 */
											$save_info = $('<div style="display:inline-block"><small><p class="text-success"><i>Saved Successfully</i></p></small></div>');
											if (formId == "helpmailForm")
												$save_info = $('<div style="display:inline-block"><small><p class="text-success"><i>Your request has been sent successfully</i></p></small></div>');
											$(".form-actions", this.el).append(
													$save_info);
											$save_info.show().delay(8000).hide(
													1);
										}
									},

									/*
									 * If error occurs in saving a model, error
									 * message in response object is shown in
									 * the form
									 */
									error : function(model) {

										// console.log(thrownError);
										// Removes disabled attribute of save
										// button
										$(this.el).find('.save').removeAttr(
												'disabled', 'disabled');
										$form.find('.save').removeAttr(
												'disabled', 'disabled');

										// Hide loading on error
										$save_info.hide();

										// Show cause of error in saving
										$save_info = $('<div style="display:inline-block"><small><p style="color:#B94A48; font-size:14px"><i>'
												+ response.responseText
												+ '</i></p></small></div>');

										// Appends error info to form actions
										// block.
										$(".form-actions", this.el).append(
												$save_info);

										// Hides the error message after 3
										// seconds
										$save_info.show().delay(6000).hide(1);
									}
								});
			},
			/**
			 * Render function, renders the view object with the model binded
			 * and show the view with model data filled in it. Render function
			 * shows loading image in the page if model is not download(if
			 * download is required). It is called whenever attributes of the
			 * model are changed, of when fetch is called on the model binded
			 * with current view.
			 * <p>
			 * And there are other cases when render should show to view in
			 * page.
			 * <p>
			 * 
			 * @param isFetched
			 *            Boolean, force render to show the view called with
			 *            'true' when model is download
			 */
			render : function(isFetched) {

				/**
				 * Renders and returns the html element of view with model data,
				 * few conditions are checked render the view according to
				 * requirement and to avoid unwanted rendering of view.
				 * conditions are
				 * <p>
				 * !this.model.isNew() = model is fetched from the server/ Sent
				 * to edit the model
				 * <p>
				 * <p>
				 * this.options.isNew = If model download form the server is not
				 * required
				 * <p>
				 * <p>
				 * !$.isEmptyObject(this.model.toJSON()) = if model is empty
				 * <p>
				 * isFetched = Force call to execute render(when fetch is
				 * success full render is called successfully)
				 * <p>
				 */
				if ((!this.model.isNew() || this.options.isNew
						|| !$.isEmptyObject(this.model.toJSON()) || isFetched)) {

					/*
					 * Uses handlebars js to fill the model data in the template
					 */
					$(this.el).html(
							getTemplate(this.options.template, this.model
									.toJSON()));
					/*
					 * Few operations on the view after rendering the view,
					 * operations like adding some alerts, graphs etc after the
					 * view is rendered, so to perform these operations callback
					 * is provided as option when creating an model.
					 */
					var callback = this.options.postRenderCallback;

					/*
					 * If callback is available for the view, callback functions
					 * is called by sending el(current view html element) as
					 * parameters
					 */
					if (callback && typeof (callback) === "function") {
						// execute the callback, passing parameters as necessary
						callback($(this.el), this.model.toJSON());
					}

					// If isNew is not true, then serialize the form data
					if (this.options.isNew != true) {
						// If el have more than 1 form de serialize all forms
						if ($(this.el).find('form').length > 1) {
							deserializeMultipleForms(this.model.toJSON(), $(
									this.el).find('form'));
						}
						// If el have one form
						else if ($(this.el).find('form').length == 1) {

							if (this.options.template
									&& (this.options.template == "macro-add-edit" || this.options.template == "automation-add-edit")
									&& this.model.toJSON().actions
									&& typeof this.model.toJSON().actions === "string")
								deserializeForm(JSON
										.parse(this.model.toJSON().actions), $(
										this.el).find('form'));
							else
								deserializeForm(this.model.toJSON(), $(this.el)
										.find('form'));

						}
					}
				}
				// Shows loading in the view, if conditions to renders are
				// satisfied
				else {
					$(this.el).html(LOADING_HTML);
				}
				// Returns view object
				return this;
			}
		});