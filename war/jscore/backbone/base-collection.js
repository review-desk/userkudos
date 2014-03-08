var BaseModel = Backbone.Model.extend({});

/**
 * Defines a backbone collection, which sorts the collection based on the
 * sortkey and parses based on the restKey
 */
var BaseCollection = Backbone.Collection.extend({
	model : BaseModel,
	/*
	 * Initializes the collection sets restKey and sortKey
	 */
	initialize : function(models, options) {
		this.restKey = options.restKey;
		if (options.sortKey)
			this.sortKey = options.sortKey;
		if (options.sortDesc)
			this.sortDesc = options.sortDesc;
	},
	/*
	 * Sorts the order of the collection based on the sortKey. When models are
	 * fetched then comparator gets the value of the softKey in the model and
	 * sorts according to it
	 */
	comparator : function(item) {
		if (this.sortKey) {
			// console.log("Sorting on " + this.sortKey);
			if (!this.sortDesc)
				return item.get(this.sortKey)

			return -item.get(this.sortKey);
		}
		return item.get('id');
	},
	/*
	 * Gets the corresponding objects based on the key from the response object
	 */
	parse : function(response) {
		// console.log("parsing " + this.restKey + " " +
		// response[this.restKey]);

		if (response && response[this.restKey])
			return response[this.restKey];

		return response;
	}
});

/*
 * Creates an view object on the model, with events click on .delete, .edit,
 * .agile_delete and respective funtionalities are defined and binds to current
 * view.
 */
var Base_List_View = Backbone.View.extend({
	events : {
		"click .delete" : "deleteItem",
		"click .edit" : "edit",
		"delete-checked .agile_delete" : "deleteItem",

	},
	/*
	 * Binds events on the model
	 */
	initialize : function() {
		_.bindAll(this, 'render', 'deleteItem', 'edit'); // every function
		// that uses 'this'
		// as the current
		// object should be
		// in here
		this.model.bind("destroy", this.close, this);
		this.model.bind("change", this.render, this);
	},
	/*
	 * On click on ".delete" model representing the view is deleted, and removed
	 * from the collection
	 */
	deleteItem : function() {
		this.model.destroy();
		this.remove();
	},
	edit : function(e) {
		/*
		 * console.log(this.model); console.log("Editing " +
		 * this.model.get("edit_template")); // Edit
		 * if(this.model.get("edit_template")) { console.log("Moving to edit");
		 * var editView = new Base_Model_View({ model: this.model, isNew: true,
		 * template: this.model.get("edit_template") }); var el =
		 * editView.render().el; $('#content').html(el); }
		 */
	},
	render : function() {
		// console.log(this.model.toJSON());
		$(this.el)
				.html(getTemplate(this.options.template, this.model.toJSON()));

		// Add model as data to it's corresponding row
		$(this.el).data(this.model);
		return this;
	}
});

/**
 * Base_Collection_view class defines a Backbone view, which binds the list of
 * models (Collections, backbone collection) i.e, defines view for the
 * collection.
 * <p>
 * Adds view to collection and binds sync (calls every time it attempts to read
 * or save a model to the server),
 * <p>
 * Whenever whenever save model operation is done, appendItem method in the
 * Base_Collection_view class is called on current view, since then sync is
 * binded with appendItem method. It appends the new model created to collection
 * and adds in the view
 * <p>
 * In View initialize function, new collection is created based on the options
 * (url, restkey, sortkey), passed while creating a new view. The collection
 * created in initialize is based on the BaseCollection (in base-colleciton.js),
 * which define the comparator and parse based on the restKey (to parse the
 * response) and sortKey (to sort the collection) passed to Base_Collection_View
 * <p>
 * Options to Base_collection_View are :
 * 
 * <pre>
 * 		resetKey :  Used to parse the response.
 * 		sortKey  : 	Used to sort the collection based in the sortkey value
 * 		url		 :	To fetch the collection and to perform CRUD operations on models 
 * 		cursor 	 :  To initialize the infiniscroll
 * </pre>
 */
var Base_Collection_View_1 = Backbone.View
		.extend({

			/**
			 * Initializes the view, creates an empty BaseCollection and options
			 * restKey, sortKey, url and binds sync, reset, error to collection.
			 * Also checks if the collection in this view needs infiniscroll
			 * (checks for cursor option).
			 */
			initialize : function() {
				// Binds functions to view
				_.bindAll(this, 'render', 'appendItem');

				// Initializes the collection with restKey and sortkey
				this.collection = new BaseCollection([], {
					restKey : this.options.restKey,
					sortKey : this.options.sortKey,
					sortDesc : this.options.sortDesc
				});

				/*
				 * Sets url to the collection to perform CRUD operations on the
				 * collection
				 */
				this.collection.url = this.options.url;

				/*
				 * Binds appendItem function to sync event of the collection
				 * i.e., Gets called every time it attempts to read or save a
				 * model to the server
				 */
				this.collection.bind('sync', this.appendItem);

				var that = this;

				/*
				 * Calls render when collection is reset
				 */
				this.collection.bind('reset', function() {
					that.render(true)
				});

				/*
				 * Binds error event to collection, so when error occurs the
				 * render is called with parameters force render and error
				 * response text to show in the template
				 */
				this.collection.bind('error', function(collection, response) {
					that.render(true, response.responseText);
				});

				// Commented as it was creating a ripple effect
				// this.collection.bind('add', function(){that.render(true)});

				/*
				 * Calls render before fetching the collection to show loading
				 * image while collection is being fetched.
				 */
				this.render();

				/*
				 * If cursor options are passed when creating a view then
				 * inifiscroll (infiniscroll.js plug in) is initialized on the
				 * collection
				 */
				if (this.options.cursor) {
					/*
					 * If page size is not defined then sets page size to 20.
					 */
					this.page_size = this.options.page_size;
					if (!this.page_size)
						this.page_size = 20;

					/*
					 * stores current view object in temp variable, can be used
					 * to call render in infiniscroll, on successful fetch on
					 * scrolling
					 */
					var that = this;

					/**
					 * Initiazlizes the infiniscroll on the collection created
					 * in the view,
					 */
					this.infiniScroll = new Backbone.InfiniScroll(
							this.collection,
							{
								success : function() {
									/*
									 * If fetch is success then render is
									 * called, so addition models fetched in
									 * collection are show in the view
									 */
									that.render(true)
								},
								untilAttr : 'cursor',
								param : 'cursor',
								strict : true,
								pageSize : this.page_size,

								/*
								 * Shows loading on fetch, at the bottom of the
								 * table
								 */
								onFetch : function() {
									$("#chat-transcript")
											.after(
													'<div id="loading_transcripts" style="margin-left:50%"> <img src="/img/ajax-loader-cursor.gif" style="height: 11px; margin-right: 20px"></div>');

								}
							});

					/*
					 * Adds infiniscroll objects in to a map with current route
					 * as key, to manage the infiniscroll if view changes i.e.,
					 * to disable infiniscroll on different view if not
					 * necessary.
					 */
					addInfiniScrollToRoute(this.infiniScroll);

					// Store in a variable for us to access in the custom fetch
					// as this is different
					var page_size = this.page_size;

					// Set the URL
					this.collection.fetch = function(options) {

						options || (options = {})
						options.data || (options.data = {});
						options.data['page_size'] = page_size;
						return Backbone.Collection.prototype.fetch.call(this,
								options);
					};

					// this.collection.url = this.collection.url + "?page_size="
					// + this.page_size;
				}

			},
			/**
			 * Takes each model and creates a view for each model using model
			 * template and appends it to model-list, This method is called
			 * whenever a model is added or deleted from the collection, since
			 * this method is binded with sync event of collection
			 * 
			 * @param base_model
			 *            backbone model object
			 */
			appendItem : function(base_model) {

				if (base_model.get("count")) {
					TRANSCRIPTS_COUNT = base_model.get("count");

					return;
				}

				// If modelData is set in options of the view then custom data
				// is added to model.
				if (this.options.modelData) {
					// console.log("Adding custom data");
					base_model.set(this.options.modelData);
				}

				/*
				 * Creates Base_List_View i.e., view is created for the model in
				 * the collection.
				 */
				var itemView = new Base_List_View({
					model : base_model,
					template : (this.options.templateKey + '-model'),
					tagName : this.options.individual_tag_name
				});

				// Template gets populated with the data and appended to the
				// model-list in the collection.
				$(this.model_list_element).append(itemView.render().el);

				$("#content").find('div#loading_transcripts').remove();

				// Add model as data to it's corresponding row
				$('#' + this.options.templateKey + '-model-list').find(
						'tr:last').data(base_model);

			},
			/**
			 * Renders the collection to a template specified in options, uses
			 * handlebars to populate collection data in to vew
			 * <p>
			 * To use this render, naming of the handlebars template script tags
			 * should be followed
			 * <p>
			 * 
			 * <pre>
			 * 	template-name + model-list :  To append all the models in to list
			 *  template-name + collection :	appends populated model-list to this template
			 *  template-name + model 	 :  Represent each model which is appended to model-list 
			 * </pre>
			 * 
			 * @param force_render
			 *            boolean forces the render to execute, unless it is
			 *            true view is not show and loading image is shown
			 *            instead
			 */
			render : function(force_render, error_message) {

				// If collection in not reset then show loading in the content,
				// once collection is fetched, loading is removed by render and
				// view gets populated with fetched collection.
				if (force_render == undefined) {
					$(this.el).html(LOADING_HTML);
					return this;
				}

				// Remove loading
				if ($(this.el).html() == LOADING_HTML)
					$(this.el).empty();

				// If error message is defined the append error message to el
				// and return
				if (error_message) {
					$(this.el).html(
							'<div style="padding:10px;font-size:14px"><b>'
									+ error_message + '<b></div>');
					return;
				}

				// Populate template with collection and view element is created
				// with content, is used to fill heading of the table
				$(this.el).html(
						getTemplate((this.options.templateKey + '-collection'),
								this.collection.toJSON()));

				// If collection is Empty show some help slate
				if (this.collection.models.length == 0) {
					// Add element slate element in collection template send
					// collection template to show slate pad
					// fillSlate("slate", this.el);
				}

				// Add row-fluid if user prefs are set to fluid
				// if (IS_FLUID) {
				// $(this.el).find('div.row').removeClass('row').addClass(
				// 'row-fluid');
				// }

				/*
				 * Few operations on the view after rendering the view,
				 * operations like adding some alerts, graphs etc after the view
				 * is rendered, so to perform these operations callback is
				 * provided as option when creating an model.
				 */
				var callback = this.options.postRenderCallback;

				this.model_list_element = $('#' + this.options.templateKey
						+ '-model-list', $(this.el));

				/*
				 * Iterates through each model in the collection and creates a
				 * view for each model and adds it to model-list
				 */
				_(this.collection.models).each(function(item) { // in case
					// collection is
					// not empty
					this.appendItem(item);
				}, this);

				/*
				 * If callback is available for the view, callback functions is
				 * called by sending el(current view html element) as parameters
				 */
				if (callback && typeof (callback) === "function") {

					console.log("gdhgh");

					// execute the callback, passing parameters as necessary
					callback($(this.el));
				}

				// Add checkboxes to specified tables by triggering this event
				// $('body').trigger('agile_collection_loaded');

				// For the first time fetch, disable Scroll bar if results are
				// lesser
				if (this.page_size && (this.collection.length < this.page_size)) {
					// console.log("Disabling infini scroll");
					this.infiniScroll.destroy();
				}

				return this;
			}
		});