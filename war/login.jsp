<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<%
	// Checks if it is being access directly and not through servlet
		if (request.getAttribute("javax.servlet.forward.request_uri") == null) {
			response.sendRedirect("/login");
			return;
		}
	%>
<!DOCTYPE html>
<!-- Template Name: Clip-One - Responsive Admin Template build with Twitter Bootstrap 3 Version: 1.2.3 Author: ClipTheme -->
<!--[if IE 8]><html class="ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9 no-js" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- start: HEAD -->
<head>
<title>Login</title>
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
		<!-- start: LOGIN BOX -->
		<div class="box-login">
			<h3
				style="color: #f90; border-bottom: 1px dotted #CCC; padding-bottom: 10px; margin-bottom: 15px;">Sign
				In</h3>
			<p>Please enter your name and password to log in.</p>
			<form id="login_form" class="form-login" action="/login" method='post'
				method='post' onsubmit="return isValid()">

				<%
					String error = request.getParameter("error");
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
						<span class="input-icon"> <input type="text"
							class="form-control required email field" name="user_id"
							placeholder="Username"> <i class="fa fa-user"></i>
						</span>
					</div>
					<div class="form-group form-actions">
						<span class="input-icon"> <input type="password"
							class="form-control required field" name="password"
							placeholder="Password"> <i class="fa fa-lock"></i> <a
							class="forgot" href="/forgot-password"> I forgot my password
						</a>
						</span>
					</div>
					<input type="hidden" name="command" value="login">
					<div class="form-actions">
						<label for="remember" class="checkbox-inline"> <input
							type="checkbox" class="grey remember" id="remember"
							name="remember"> Keep me signed in
						</label>
						<button type="submit" class="btn btn-bricky pull-right">
							Login <i class="fa fa-arrow-circle-right"></i>
						</button>
					</div>
					<div class="new-account">
						Don't have an account yet? <a href="/register" class="register">
							Create an account </a>
					</div>
				</fieldset>
			</form>
		</div>
		<!-- end: LOGIN BOX -->

		<!-- start: COPYRIGHT -->
		<div class="copyright">2014 &copy; ReviewDesk.</div>
		<!-- end: COPYRIGHT -->
	</div>


	<!-- <script
		src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
	<script
		src="assets/plugins/jquery-validation/dist/jquery.validate.min.js"></script> -->

	<script src="/lib/jquery.min.js"></script>
	<script src="/lib/jquery.validate.min.js"></script>
	
	<script>
		$(document).ready(function() {

			// Submits the clickdesk form to LoginServlet
			$("form").validate({
				submitHandler : function(form) {
					form.submit();
				}
			});

		});

		// Validates the form fields
		function isValid() {
			$("#login_form").validate();
			return $("#login_form").valid();
		}
	</script>
</body>






</html>