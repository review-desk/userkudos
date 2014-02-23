package com.reviewdesk;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.reviewdesk.user.RegisterUser;
import com.reviewdesk.user.Users;

@SuppressWarnings("serial")
public class RegisterServlet extends HttpServlet {

	public static final String AUTH_USER_SESSION = "user_session";

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException, ServletException {
		doGet(req, resp);

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		try {
			request.getSession().removeAttribute(AUTH_USER_SESSION);

			// Get command
			String command = request.getParameter("command");
			if (StringUtils.isBlank(command)
					|| !StringUtils.equalsIgnoreCase(command, "register")) {

				request.getRequestDispatcher("/register.jsp").forward(request,
						response);
				return;
			}

			String userName = request.getParameter("user_name");
			String userId = request.getParameter("user_id");
			String password = request.getParameter("password");

			if (StringUtils.isBlank(userName) || StringUtils.isBlank(userId)
					|| StringUtils.isBlank(password))
				throw new Exception(
						"Input. Email or password has been left blank.");

			Users user = RegisterUser.registerUser(request);

			// Create session
			UserSession userSession = new UserSession("reviewdesk.com",
					user.user_id, user.user_name);

			request.getSession().setAttribute(AUTH_USER_SESSION, userSession);

			// To set session active for 15 days if "keep me signin"
			request.getSession().setMaxInactiveInterval(15 * 24 * 60 * 60);

			// redirect to the home page
			response.sendRedirect("/home");
			return;

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			String registerError = e.getMessage();

			System.out.println("exe = " + e);

			request.getRequestDispatcher(
					"register.jsp?error=" + URLEncoder.encode(registerError))
					.forward(request, response);

			return;

		}

	}
}
