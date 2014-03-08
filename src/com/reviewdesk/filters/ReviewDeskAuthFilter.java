package com.reviewdesk.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.reviewdesk.SessionManager;
import com.reviewdesk.UserSession;

public class ReviewDeskAuthFilter implements Filter {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub

		// Reset the thread local
		SessionManager.set((UserSession) null);

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;

		String uri = httpRequest.getRequestURI();

		if (httpRequest.getSession(false) == null) {
			httpResponse.sendRedirect("/login");
			return;
		}

		System.out.println("Session Manager cookie = "
				+ httpRequest.getSession().getAttribute(
						SessionManager.AUTH_USER_SESSION));

		UserSession userSession = (UserSession) httpRequest.getSession()
				.getAttribute(SessionManager.AUTH_USER_SESSION);

		if (userSession == null) {
			httpResponse.sendRedirect("/login");
			return;
		}

		// Add this in session manager
		SessionManager.set((HttpServletRequest) request);

		chain.doFilter(httpRequest, httpResponse);
		return;

	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		// TODO Auto-generated method stub

		// System.out.println("ReviewDesk auth filter init");
	}

}
