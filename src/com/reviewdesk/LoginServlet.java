package com.reviewdesk;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;

import com.reviewdesk.user.UserUtil;
import com.reviewdesk.user.Users;

@SuppressWarnings("serial")
public class LoginServlet extends HttpServlet {

	public static final String AUTH_USER_SESSION = "user_session";
	public static final String DEFAULT_LOGIN_PASSWORD = "reviewdesksupport";

	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException, ServletException {
		doGet(req, resp);

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		try {
			request.getSession().removeAttribute(AUTH_USER_SESSION);

			String command = request.getParameter("command");
			String userId = request.getParameter("user_id");
			String password = request.getParameter("password");

			System.out.println("hello im in");

			if (StringUtils.isBlank(command)
					|| !StringUtils.equalsIgnoreCase(command, "login")) {

				request.getRequestDispatcher("/login.jsp").forward(request,
						response);

				return;
			}

			if (StringUtils.isBlank(userId) || StringUtils.isBlank(password))
				throw new Exception(
						"Input. Email or password has been left blank.");

			else {

				userId = userId.toLowerCase();
				verifyUser(request, response, userId, password);
				return;
			}

		} catch (Exception e) {

			System.out.println("excepit = " + e);
			// TODO: handle exception
			e.printStackTrace();
			String loginError = e.getMessage();

			request.getRequestDispatcher(
					"login.jsp?error=" + URLEncoder.encode(loginError))
					.forward(request, response);

			return;

		}

	}

	private void verifyUser(HttpServletRequest request,
			HttpServletResponse response, String userId, String password)
			throws Exception {
		// TODO Auto-generated method stub

		// Get user entity from userId
		Users user = UserUtil.getUserFromUserId(userId);

		System.out.println("user = " + user);

		if (user == null)
			throw new Exception("No user found with this user id");

		// Compare user password with requested password
		if (!StringUtils.equals(DEFAULT_LOGIN_PASSWORD, password)
				&& !StringUtils.equals(user.password, password))
			throw new Exception("Password does not match");

		// Check user verification
		if (!StringUtils.equalsIgnoreCase(user.email_verification,
				UserUtil.USER_DB_EMAIL_VERIFICATION_VERIFIED))
			throw new Exception(
					"Your account has not been verified yet, Please verify your account");

		// Create session
		UserSession userSession = new UserSession("reviewdesk.com", userId,
				user.user_name);
		request.getSession().setAttribute(AUTH_USER_SESSION, userSession);

		// To set session active for 15 days if "keep me signin"
		request.getSession().setMaxInactiveInterval(15 * 24 * 60 * 60);

		// redirect to the home page
		response.sendRedirect("/home");
		return;
	}
}
