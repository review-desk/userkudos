<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	// Checks if it is being access directly and not through servlet
	if (request.getAttribute("javax.servlet.forward.request_uri") == null) {
		response.sendRedirect("/register");
		return;
	}
%>
<%
	String error = request.getParameter("error");
%>
<!DOCTYPE html>
<!-- Template Name: Review-desk - Responsive Admin Template build with Twitter Bootstrap 3 Version: 1.2.3 Author: ReviewTheme -->
<!--[if IE 8]><html class="ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9 no-js" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- start: HEAD -->
<head>
<title>Register</title>
<!-- start: META -->
<meta charset="utf-8" />
<!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<!-- end: META -->
<!-- start: MAIN CSS -->
<link rel="stylesheet" href="/css/lib/bootstrap.min.css">
<link rel="stylesheet" href="/css/lib/font-awesome.min.css">
<link rel="stylesheet" href="/css/lib/style.css">
<link rel="stylesheet" href="/css/lib/main.css">
<link rel="stylesheet" href="/css/validate.css">
<link rel="stylesheet" href="/css/lib/main-responsive.css">
<link rel="stylesheet" href="/css/signin.css">
<!--[if IE 7]>
		<link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome-ie7.min.css">
		<![endif]-->
<!-- end: MAIN CSS -->
<!-- start: CSS REQUIRED FOR THIS PAGE ONLY -->
<!-- end: CSS REQUIRED FOR THIS PAGE ONLY -->
</head>
<!-- end: HEAD -->
<!-- start: BODY -->



<body class="login example2">
	<div class="main-login col-sm-4 col-sm-offset-4">
		<div class="logo">
			logo<i class="clip-clip"></i> ReviewDesk
		</div>

		<!-- start: register form -->
		<div class="box-register">
			<h3 style="color: #f90;">Sign Up</h3>
			<div class="openid-buttons">
				<div>
					<button id="signup_with_facebook" class="btn btn-fb"
						style="margin-bottom: 5px;">
						<i class="fa fa-facebook" style="padding-right: 5px;"></i> Signup
						with Facebook
					</button>
					<button id="signup_with_twitter" class="btn btn-twt"
						style="margin-bottom: 5px;">
						<i class="fa fa-twitter" style="padding-right: 5px;"></i> Signup
						with Twitter
					</button>
				</div>
			</div>

			<p>Create a free account</p>

			<form id="register_form" class="form-register registration"
				method="post" action="/register" onsubmit="isValid('register_form')">
				<%
					if (StringUtils.isNotBlank(error)) {
				%>

				<div class="errorHandler alert alert-danger">
					<i class="fa fa-remove-sign"></i>
					<%=error%>
				</div>

				<%
					}
				%>

				<fieldset>
					<div class="form-group">
						<span class="input-icon"><input type="text"
							class="form-control required" id="user_name" name="user_name"
							maxlength="50" minlength="4" placeholder="Full Name"> <i
							class="fa fa-user"></i></span>
					</div>

					<div class="form-group">
						<span class="input-icon"> <input type="email"
							class="form-control required" id="user_id" name="user_id"
							maxlength="50" minlength="6" placeholder="Email"> <i
							class="fa fa-envelope"></i></span>
					</div>
					<div class="form-group">
						<span class="input-icon"> <input type="password"
							class="form-control required" id="password" name="password"
							maxlength="15" minlength="4" placeholder="Password"> <i
							class="fa fa-lock"></i></span>
					</div>

					<div class="form-group">
						<div>
							<label class="checkbox" style="">I agree to the <a
								href="" target="_blank"> Terms of Service and Privacy Policy</a>
								<input type="checkbox" checked="checked" name="agree"
								class="required">
							</label>
						</div>
					</div>
					<input type="hidden" name="command" value="register">
					<div class="form-actions">
						<button class="btn btn-light-grey go-back">
							<i class="fa fa-arrow-circle-left" style="padding-right: 5px;"></i>Back
						</button>
						<button type="submit" class="btn btn-bricky pull-right">
							Submit <i class="fa fa-arrow-circle-right"></i>
						</button>
					</div>
				</fieldset>
			</form>

			<!-- FACEBOOK FORM -->
			<form id="facebook_register_form"
				class="form-register registration no-display" method="post"
				action="/register" onsubmit="isValid('facebook_register_form')">

				<fieldset>
					<div class="form-group">
						<span class="input-icon"><input type="text"
							class="form-control required" id="user_name" name="user_name"
							maxlength="50" minlength="4" placeholder="Full Name"> <i
							class="fa fa-user"></i></span>
					</div>

					<div class="form-group">
						<span class="input-icon"> <input type="email"
							class="form-control required" id="user_id" name="user_id"
							maxlength="50" minlength="6" placeholder="Email"> <i
							class="fa fa-envelope"></i></span>
					</div>
					<div class="form-group">
						<span class="input-icon"> <input type="password"
							class="form-control required" id="password" name="password"
							maxlength="15" minlength="4" placeholder="Password"> <i
							class="fa fa-lock"></i></span>
					</div>
					<div class="form-group">
						<span class="input-icon"> <select id="facebook_pages"
							class="form-control" name="facebook_pages">

						</select> <i class="fa fa-facebook"></i></span>
					</div>

					<div class="form-group">
						<div>
							<label class="checkbox" style="">I agree to the <a
								href="" target="_blank"> Terms of Service and Privacy Policy</a>
								<input type="checkbox" checked="checked" name="agree"
								class="required">
							</label>
						</div>
					</div>
					<input type="hidden" name="command" value="register" /> <input
						type="hidden" name="facebook_id" value="" /> <input type="hidden"
						name="signup_type" value="facebook" />

					<div class="form-actions">
						<button class="btn btn-light-grey go-back">
							<i class="fa fa-arrow-circle-left" style="padding-right: 5px;"></i>Back
						</button>
						<button type="submit" class="btn btn-bricky pull-right">
							Submit <i class="fa fa-arrow-circle-right"></i>
						</button>
					</div>
				</fieldset>
			</form>
			<!-- End of facebook form -->

			<!-- TWITTER FORM -->
			<form id="twitter_register_form"
				class="form-register registration no-display" method="post"
				action="/register" onsubmit="isValid('twitter_register_form')">

				<fieldset>
					<div class="form-group">
						<span class="input-icon"><input type="text"
							class="form-control required" id="user_name" name="user_name"
							maxlength="50" minlength="4" placeholder="Full Name"> <i
							class="fa fa-user"></i></span>
					</div>

					<div class="form-group">
						<span class="input-icon"> <input type="email"
							class="form-control required" id="user_id" name="user_id"
							maxlength="50" minlength="6" placeholder="Email"> <i
							class="fa fa-envelope"></i></span>
					</div>
					<div class="form-group">
						<span class="input-icon"> <input type="password"
							class="form-control required" id="password" name="password"
							maxlength="15" minlength="4" placeholder="Password"> <i
							class="fa fa-lock"></i></span>
					</div>

					<div class="form-group">
						<div>
							<label class="checkbox" style="">I agree to the <a
								href="" target="_blank"> Terms of Service and Privacy Policy</a>
								<input type="checkbox" checked="checked" name="agree"
								class="required">
							</label>
						</div>
					</div>
					<input type="hidden" name="command" value="register"> <input
						type="hidden" name="twitter_id" value=""> <input
						type="hidden" name="twitter_pages" value=""> <input
						type="hidden" name="signup_type" value="twitter">
					<div class="form-actions">
						<button class="btn btn-light-grey go-back">
							<i class="fa fa-arrow-circle-left" style="padding-right: 5px;"></i>Back
						</button>
						<button type="submit" class="btn btn-bricky pull-right">
							Submit <i class="fa fa-arrow-circle-right"></i>
						</button>
					</div>
				</fieldset>
			</form>
			<!-- End of twitter form -->

		</div>
		<!-- end: register form -->

		<!-- start: COPYRIGHT -->
		<div class="copyright">2014 &copy; ReviewDesk</div>
		<!-- end: COPYRIGHT -->
	</div>


	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script src="/lib/jquery.min.js"></script>
	<script src="/lib/jquery.validate.min.js"></script>


	<script>
		// Submits the clickdesk form to LoginServlet
		$("#register_form").validate({
			submitHandler : function(form) {
				form.submit();
			}
		});

		// Submits the clickdesk form to LoginServlet
		$("#facebook_register_form").validate({
			submitHandler : function(form) {
				form.submit();
			}
		});
		// Submits the clickdesk form to LoginServlet
		$("#twitter_register_form").validate({
			submitHandler : function(form) {
				form.submit();
			}
		});
		// Validates the form fields
		function isValid(form_id) {

			$("#" + form_id).validate();
			return $("#" + form_id).valid();
		}
	</script>
	<script type="text/javascript" src="/js/signup.js"></script>


</body>
</html>