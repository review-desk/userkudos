<%@page import="com.reviewdesk.user.Users"%>
<%@page import="com.reviewdesk.user.UserUtil"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	String error = "", success = "";

	try {
		String id = request.getParameter("id");
		String userId = request.getParameter("user_id");

		if (StringUtils.isBlank(id) || StringUtils.isBlank(userId))
			throw new Exception("parameters are empty");

		long ids = Long.parseLong(id);

		Users user = UserUtil.getUserFromId(ids);

		if (user == null
				|| !StringUtils.equalsIgnoreCase(user.user_id, userId))
			throw new Exception("No user found");

		if (StringUtils.isNotBlank(user.email_verification)
				&& StringUtils.equalsIgnoreCase(
						user.email_verification,
						UserUtil.USER_DB_EMAIL_VERIFICATION_VERIFIED))
			throw new Exception(
					"Your email has been already verified. You can now <a href=\"login\"><u>login</u></a>.");

		user.email_verification = UserUtil.USER_DB_EMAIL_VERIFICATION_VERIFIED;
		user.save();

		success = "Your email has been successfully verified. You can now <a href=\"login\"><u>login</u></a>.";

	} catch (Exception e) {
		error = e.getMessage();
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
<body class="login example2">
	<div class="main-login col-sm-4 col-sm-offset-4">
		<div class="logo">
			logo<i class="clip-clip"></i> ReviewDesk
		</div>
		<!-- start: LOGIN BOX -->
		<div class="box-login">
			<h3
				style="color: #f90; border-bottom: 1px dotted #CCC; padding-bottom: 10px; margin-bottom: 15px;">
				Email Verification</h3>

			<%
				if (StringUtils.isNotBlank(success)) {
			%>
			<div class="errorHandler alert alert-success">
				<i class="fa fa-remove-sign"></i>
				<%=success%>
			</div>

			<%
				}
			%>

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

		</div>
		<!-- end: LOGIN BOX -->

		<!-- start: COPYRIGHT -->
		<div class="copyright">2014 &copy; ReviewDesk.</div>
		<!-- end: COPYRIGHT -->
	</div>

</body>

</html>