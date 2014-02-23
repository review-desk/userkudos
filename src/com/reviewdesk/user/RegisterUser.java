package com.reviewdesk.user;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;

import com.reviewdesk.social.SocialPrefsUtil;

public class RegisterUser {

	public static Users registerUser(HttpServletRequest request)
			throws Exception {
		// TODO Auto-generated method stub

		String userName = request.getParameter("user_name");
		String userId = request.getParameter("user_id");
		String password = request.getParameter("password");
		String signupType = request.getParameter("signup_type");

		if (StringUtils.isBlank(userName) || StringUtils.isBlank(userId)
				|| StringUtils.isBlank(password))
			throw new Exception("Input. Email or password has been left blank.");

		userId = userId.toLowerCase();
		Users user = UserUtil.getUserFromUserId(userId);
		System.out.println("user = " + user);

		if (user != null)
			throw new Exception(
					"User with same email address already exists in our system.");

		if (StringUtils.isBlank(signupType))
			signupType = UserUtil.USER_DB_SIGNUP_TYPE_REVIEWDESK;

		user = createUser(request, userName, userId, password, signupType);

		// Get back the user
		// user = UserUtil.getUserFromUserId(userId);

		// System.out.println("user 2  = " + user);
		// System.out.println("userID = " + user.user_id);

		System.out.println("test = ");

		// Send verification Email
		Verification.sendVerificationEMail(user);

		// Create social prefs for openID signup user
		SocialPrefsUtil.createSocialPrefs(request, user, signupType);

		return user;

	}

	private static Users createUser(HttpServletRequest request,
			String userName, String userId, String password, String signupType)
			throws Exception {
		// TODO Auto-generated method stub

		if (userName == null || userId == null || password == null
				|| signupType == null)
			throw new Exception("Invalid input");

		long signupDate = Calendar.getInstance().getTimeInMillis();
		String emailVerification = signupDate + "";

		String address = getUserAddress(request);

		System.out.println("address = " + address);

		// address = null;

		Users user = new Users(userId, password, userName, address, signupDate,
				emailVerification, signupType);

		user.save();
		
		return user;
	}

	private static String getUserAddress(HttpServletRequest request)
			throws Exception {
		// TODO Auto-generated method stub

		JSONObject address = new JSONObject();
		try {
			address.put("country_code",
					request.getHeader("X-AppEngine-Country"));

			// address.put("country_name",
			// CountriesUtil.getCountryNameFromCountryCode(request.getHeader("X-AppEngine-Country")));
			address.put("region", request.getHeader("X-AppEngine-Region"));
			address.put("city", request.getHeader("X-AppEngine-City"));

			String langAndLattitude = request
					.getHeader("X-AppEngine-CityLatLong");
			if (StringUtils.isNotBlank(langAndLattitude)) {
				address.put("langitude", langAndLattitude.split(",")[0]);
				address.put("lattitude", langAndLattitude.split(",")[1]);
			}

			// Put IP also
			address.put("ip_address", request.getRemoteAddr());

		} catch (Exception e) {
			// TODO: handle exception
		}

		return address.toString();
	}

}
