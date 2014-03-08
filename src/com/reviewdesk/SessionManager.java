package com.reviewdesk;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

// We store Sessions in Session Manager
public class SessionManager
{
	
	public static final String AUTH_USER_SESSION = "user_session";

	// It has to be static and final for ThreadLocal to work properly
	public static final ThreadLocal<UserSession> threadLocal = new ThreadLocal<UserSession>();

	public static void set(UserSession user)
	{
		threadLocal.set(user);
	}

	public static void unset()
	{
		threadLocal.remove();
	}

	public static UserSession get()
	{
		return threadLocal.get();
	}

	public static void set(HttpServletRequest request) throws ServletException
	{

		UserSession userInfo = (UserSession) request.getSession().getAttribute(AUTH_USER_SESSION);
		if (userInfo == null)
			throw new ServletException("Request null");

		set(userInfo);
	}
	
	public static String getUserEmail()
	{
		// Should not happen but we check
		if (threadLocal == null)
			return null;

		return threadLocal.get().getEmail();
	}

	public static Long getUserId()
	{
		// Should not happen but we check
		if (threadLocal == null)
			return null;

		return threadLocal.get().getId();
	}

}
