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
});