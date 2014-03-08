var ReviewDeskRouter = Backbone.Router.extend({
	routes : {

		"" : "dashboard",
		"dashboard" : "dashboard",
	},

	dashboard : function() {

		$(".navbar-collapse .active").removeClass("active");

		$("#dashboardmenu").addClass("active");

		$("#content").html(getTemplate("dashboard", {}));

		this.recentReviewCollectionView = new Base_Collection_View_1({
			url : '/rest/reviews/recent',
			templateKey : "recent-reviews",
			individual_tag_name : 'tr',
			postRenderCallback : function(el) {

			}

		});

		this.recentReviewCollectionView.collection.fetch();

		$("#recent_user_reviews").html(
				this.recentReviewCollectionView.render().el);

	}
});//All Review desk Routers are global
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

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/
 
var MD5 = function (string) {
 
	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
 
	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
 	}
 
 	function F(x,y,z) { return (x & y) | ((~x) & z); }
 	function G(x,y,z) { return (x & z) | (y & (~z)); }
 	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }
 
	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};
 
	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};
 
	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};
 
	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	};
 
	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;
 
	string = Utf8Encode(string);
 
	x = ConvertToWordArray(string);
 
	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}
 
	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
	return temp.toLowerCase();
}// var LOADING_HTML = "<img class='loading' style='padding-right:5px' src='/images/loading-image.gif' />";
//var LOADING_ON_CURSOR = '<img class="loading" style="padding-right:5px" src= "img/ajax-loader-cursor.gif"></img>';
//
//var DEFAULT_GRAVATAR_url = "https://d13pkp0ru5xuwf.cloudfront.net/css/images/pic.png";

var LOADING_HTML = '<img class="loading" style="padding-right:5px" src= "/images/loading-image.gif" />';/**
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

	alert(email);

	if (!email)
		email = "";

	var defaultImage = "https://contactuswidget.appspot.com/images/pic.png";
	var gravatatURL = "https://secure.gravatar.com/avatar/" + MD5(email)
			+ '?d=' + encodeURIComponent(defaultImage);
	return new Handlebars.SafeString(gravatatURL);
});
var _reviewdesk = {}
_reviewdesk.debug = true;

function _reviewdesk_log(message) {

	if (!_reviewdesk || !_reviewdesk.debug)
		return;

	console.log(message);

}var BaseModel = Backbone.Model.extend({});

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
		});/* !JSCore */
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
		});/**
 * Infini scroll utility to control the scroll on all routes,
 * Called from base-collection when page requires infiniscroll function and from app.js when route is initialized
 */

/**
 * Map to store infini scroll object with route name as a key
 */
var INFINI_SCROLL_JSON = {};

/**
 * Adds infini_scroll object to JSON Object with current route as key. Destroys
 * infini scroll if already exists in map and sets new infini scroll object to
 * current route
 * 
 * @param inifni_scroll
 *            infiniscroll object
 */
function addInfiniScrollToRoute(infini_scroll) {
	var current_route = window.location.hash.split("#")[1];

	// Destroys infini scroll
	if (INFINI_SCROLL_JSON[current_route])
		INFINI_SCROLL_JSON[current_route].destroy();

	// Sets new infini scroll object w.r.t current route
	INFINI_SCROLL_JSON[current_route] = infini_scroll;
}

// Activates infiniScroll for routes
/**
 * Activates infiniScroll for current route(if required) and disables scroll in
 * other routes, to solve unnecessary requests on scroll. This method is called
 * when routes are initialized
 */
function activateInfiniScroll() {

	// Gets the current route from the url of the browser, splits at "#" (
	// current route is after "#" ).
	var current_route = window.location.hash.split("#")[1];

	// Disables all infini scrolls in the map
	$.each(INFINI_SCROLL_JSON, function(key, value) {
		value.disableFetch();
	});

	// Enables fetch if current route exists in INFINI_SCROLL_JSON map
	if (INFINI_SCROLL_JSON[current_route])
		INFINI_SCROLL_JSON[current_route].enableFetch();
}/**
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
}/**
 * Serialize.js is used to serialize the forms, It returns a map, with field
 * values in form mapped against field names in the form as keys. It uses jquery
 * serializeArray method to serialize field value, and also provides custom
 * serializations for fields, to get custom values form the fields.
 * 
 * @param form_id
 *            Sends form id to be serialized
 * @returns JSON returns serialized form values
 */

function serializeForm(form_id) {

	if ($('#' + form_id + '.cancel_subscription')) {
		get_hidden_feild_values();
	}

	// var arr = $($('#' + form_id)[0]).serializeArray(), obj = {};
	var arr = $('#' + form_id).serializeArray(), obj = {};

	/*
	 * Serializes check box, though serialization for check box is available in
	 * SerializeArray which return "on", if checked. Since it is required to
	 * return true, if check box field is checked, so serialization is
	 * customized for checkbox.
	 */
	arr = arr.concat($('#' + form_id + ' input[type=checkbox]').map(function() {
		return {
			"name" : this.name,
			"value" : $(this).is(':checked')
		}
	}).get());

	// Converts array built from the form fields into JSON
	for ( var i = 0; i < arr.length; ++i) {
		obj[arr[i].name] = arr[i].value;
	}

	// obj[ $('#' + form_id + ' select').attr('name') ] = $('#' + form_id + '
	// select').val();
	return obj;
}/**
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