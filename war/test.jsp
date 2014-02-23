<%@page import="com.reviewdesk.social.SocialPrefs"%>
<%@page import="com.reviewdesk.user.Users"%>
<%


SocialPrefs h = new SocialPrefs();
h.facebook = "true";
// h.user_id = (long) 1;

	h.save();

%>