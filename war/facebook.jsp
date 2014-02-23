<%@page import="com.reviewdesk.openid.ScribeOpenIdServlet"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%
	String type = request.getParameter("type");

	if (StringUtils.isNotBlank(type)
			|| StringUtils.equalsIgnoreCase(type, "facebook_oauth")) {
		response.sendRedirect("/scribe?service_type=facebook");
		return;
	}

	String error = request.getParameter("error");
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

	<%
		if (StringUtils.isNotBlank(error)) {
	%>
	<p><%=error%></p>
	<%
		}
	%>

	<%
	
	// GEt facebookjson from session
	String facebookResponseString = (String) request.getSession().getAttribute(ScribeOpenIdServlet.SERVICE_TYPE_FACEBOOK_SESSION);
	
	JSONObject facebookJSON = new JSONObject(facebookResponseString);
	
		//JSONObject facebookJSON = (JSONObject) request.getAttribute("facebook_user_details");
		if (facebookJSON != null) {
	%>

	<script type="text/javascript">
		(function() {

			var facebook_details =
	<%=facebookJSON%>
		;
			window.opener.reviewdesk_popupRegisterCallback("facebook",
					facebook_details);
			window.close();
		})();
	</script>

	<%
		}
	%>

</body>
</html>