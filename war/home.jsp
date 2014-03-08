<!DOCTYPE html>


<%@page import="com.reviewdesk.SessionManager"%>
<%@page import="javax.mail.Session"%>
<%@page import="com.reviewdesk.user.Users"%>
<%@page import="com.reviewdesk.user.UserUtil"%>
<%@page import="com.reviewdesk.LoginServlet"%>
<%@page import="com.reviewdesk.UserSession"%>
<%
	UserSession userSession = (UserSession) request.getSession()
			.getAttribute(SessionManager.AUTH_USER_SESSION);

	if (userSession == null)
		response.sendRedirect("/login");

	Long id = (Long) userSession.getId();

	Users user = UserUtil.getUserFromId(id);
	if (user == null)
		response.sendRedirect("/login?error=no user found");

	String userId = user.user_id;
	String userName = user.user_name;

%>
<!--[if IE 8]><html class="ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9 no-js" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- start: HEAD -->
<head>
<title>Recruitfox.com</title>
<!-- start: META -->
<meta charset="utf-8" />
<!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta content="" name="description" />
<meta content="" name="author" />
<!-- end: META -->
<!-- start: MAIN CSS -->
<link rel="stylesheet" href="/css/lib/bootstrap.min.css">
<link rel="stylesheet" href="/css/lib/font-awesome.min.css">
<link rel="stylesheet" href="/css/lib/style.css">
<link rel="stylesheet" href="/css/lib/main.css">
<link rel="stylesheet" href="/css/validate.css">
<link rel="stylesheet" href="/css/lib/main-responsive.css">
<link rel="stylesheet" href="/css/signin.css">

<link rel="stylesheet" href="/css/lib/all.css">
<link rel="stylesheet" href="/css/lib/bootstrap-colorpalette.css">
<link rel="stylesheet" href="/css/lib/perfect-scrollbar.css">
<link rel="stylesheet" href="/css/lib/theme_light.css" type="text/css"
	id="skin_color">
<link rel="stylesheet" href="/css/lib/print.css" type="text/css"
	media="print" />
<!--[if IE 7]>
    <link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome-ie7.min.css">
    <![endif]-->
<!-- end: MAIN CSS -->
<!-- start: CSS REQUIRED FOR THIS PAGE ONLY -->
<link rel="stylesheet" href="/css/lib/fullcalendar.css">
<!-- end: CSS REQUIRED FOR THIS PAGE ONLY -->
<link rel="shortcut icon" href="favicon.ico" />
</head>
<!-- end: HEAD -->
<!-- start: BODY -->
<body>
	<!-- start: HEADER -->
	<div class="navbar navbar-inverse navbar-fixed-top"
		style="background-color: #141a6b;">
		<!-- start: TOP NAVIGATION CONTAINER -->
		<div class="container">
			<div class="navbar-header">
				<!-- start: RESPONSIVE MENU TOGGLER -->
				<button data-target=".navbar-collapse" data-toggle="collapse"
					class="navbar-toggle" type="button">
					<span class="clip-list-2"></span>
				</button>
				<!-- end: RESPONSIVE MENU TOGGLER -->
				<!-- start: LOGO -->
				<a class="navbar-brand" href="index.html" style="color: #ffffff;">
					<i class="clip-share"></i>ReviewDesk
				</a>

				<!-- end: LOGO -->
			</div>
			<div class="navbar-tools">
				<!-- start: TOP NAVIGATION MENU -->
				<ul class="nav navbar-right">
					<li class="dropdown current-user"><a data-toggle="dropdown"
						data-hover="dropdown" class="dropdown-toggle"
						data-close-others="true" href="#"> <img
							src="assets/images/avatar-1-small.jpg" class="circle-img" alt="">
							<span class="username"><%=userName%></span> <i
							class="clip-chevron-down"></i>
					</a>
						<ul class="dropdown-menu">
							<li><a href="pages_user_profile.html"> <i
									class="clip-user-2"></i> &nbsp;Plan & Upgrade
							</a></li>
							<li><a href="pages_calendar.html"> <i
									class="clip-calendar"></i> &nbsp;Settings
							</a>
							<li><a href="pages_messages.html"> <i
									class="clip-bubble-4"></i> &nbsp;Contact Us
							</a></li>
							<li class="divider"></li>

							<li><a href="/login"> <i class="clip-exit"></i>
									&nbsp;Log Out
							</a></li>
						</ul></li>
					<!-- end: USER DROPDOWN -->
				</ul>
				<!-- end: TOP NAVIGATION MENU -->
			</div>
		</div>
		<!-- end: TOP NAVIGATION CONTAINER -->
	</div>
	<!-- end: HEADER -->
	<!-- start: MAIN CONTAINER -->
	<div class="main-container">
		<div class="navbar-content">
			<!-- start: SIDEBAR -->
			<div class="main-navigation navbar-collapse collapse">
				<!-- start: MAIN MENU TOGGLER BUTTON -->
				<div class="navigation-toggler">
					<i class="clip-chevron-left"></i> <i class="clip-chevron-right"></i>
				</div>
				<!-- end: MAIN MENU TOGGLER BUTTON -->
				<!-- start: MAIN NAVIGATION MENU -->
				<ul class="main-navigation-menu">
					<li id="dashboardmenu" class="active open"><a href="#dashboard"><i
							class="clip-home-3"></i> <span class="title"> Dashboard </span><span
							class="selected"></span> </a></li>
					<li><a href="javascript:void(0)"><i class="fa fa-globe"></i>
							<span class="title"> Social </span><i class="icon-arrow"></i> <span
							class="selected"></span> </a>
						<ul class="sub-menu">
							<li id="facebookmenu"><a href="#"><i
									class="fa fa-facebook"></i> <span class="title">
										Facebook </span> </a></li>
							<li id="twittermenu"><a href="#"><i
									class="fa fa-twitter"></i> <span class="title"> Twitter
								</span> </a></li>

						</ul></li>
					<li><a href="javascript:void(0)"><i
							class="clip-bookmark-2"></i> <span class="title"> Display
						</span> <span class="selected"></span> </a></li>

				</ul>
				<!-- end: MAIN NAVIGATION MENU -->
			</div>
			<!-- end: SIDEBAR -->
		</div>
		<!-- start: PAGE -->
		<div class="main-content">

			<!-- end: SPANEL CONFIGURATION MODAL FORM -->
			<div id="content" class="container">
				<!-- start: PAGE HEADER -->



				<!-- end: PAGE CONTENT-->
			</div>
		</div>
		<!-- end: PAGE -->
	</div>
	<!-- end: MAIN CONTAINER -->
	<!-- start: FOOTER -->
	<div class="footer clearfix">
		<div class="footer-inner">2014 &copy; ReviewDesk</div>
		<div class="footer-items">
			<span class="go-top"><i class="clip-chevron-up"></i></span>
		</div>
	</div>
	<!-- end: FOOTER -->

	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<!--<![endif]-->

	<script src="/lib/bootstrap.min.js"></script>
	<script src="/lib/bootstrap-hover-dropdown.min.js"></script>
	<script src="/lib/perfect-scrollbar.js"></script>
	<script src="/lib/jquery.cookie.js"></script>
	<script src="/js/main.js"></script>



	<!-- end: MAIN JAVASCRIPTS -->

	<script>
		jQuery(document).ready(function() {
			Main.init();
		});
	</script>

	<%@ include file="/tpl/min/tpl.js"%>
	<!-- Backbone -->
	<script type="text/javascript"
		src="/lib/handlebars-1.0.0.beta.6-min.js"></script>
	<script type="text/javascript" src="/lib/underscore-min.js"></script>
	<script type="text/javascript" src="/lib/backbone-min.js"></script>
	<script type="text/javascript" src="/lib/infiniscroll.js"></script>
	<!-- End of backbone -->

	

	<script type="text/javascript" src="/jscore/min/js-all.js"></script>
</body>
<!-- end: BODY -->
</html>