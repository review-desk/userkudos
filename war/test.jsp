<%@page import="com.reviewdesk.UserSession"%>
<%@page import="com.reviewdesk.SessionManager"%>
<%@page import="com.reviewdesk.reviews.Reviews"%>
<%@page import="com.reviewdesk.user.Users"%>
<%



Reviews reviw = new Reviews();
reviw.email = "dfgdfg@sdfsd.xom";
reviw.message = "terst";
reviw.name = "Vaishnavi";
reviw.rating = "5";

UserSession userSession = (UserSession) request.getSession()
.getAttribute(SessionManager.AUTH_USER_SESSION);

if (userSession == null)
response.sendRedirect("/login");

Long id = (Long) userSession.getId();

reviw.user_id = id;
reviw.save();
%>