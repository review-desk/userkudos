package com.reviewdesk.openid;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.json.JSONObject;
import org.scribe.builder.ServiceBuilder;
import org.scribe.model.OAuthRequest;
import org.scribe.model.Response;
import org.scribe.model.Verb;
import org.scribe.oauth.OAuthService;

import com.reviewdesk.social.FacebookAPI;
import com.reviewdesk.util.HTTPUtil;
import com.reviewdesk.util.JSONUtil;
import com.reviewdesk.util.URLUtil;

public class ScribeOpenIdServlet extends HttpServlet {

//	public static String MY_RETURN_URL = "http://besocailbuddy.appspot.com/scribe";
//	public static String BETA_RETURN_URL = "http://besocailbuddy.appspot.com/scribe";
	
	public static String MY_RETURN_URL = "http://localhost:8888/scribe";
	public static String BETA_RETURN_URL = "http://localhost:8888/scribe";
	
	public static String SERVICE_TYPE_FACEBOOK_SESSION = "facebook";

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {

		String code = req.getParameter("code");
		String error = req.getParameter("error");

		System.out.println("code1 = " + code);
		System.out.println("error = " + error);

		if (StringUtils.isNotBlank(error)
				|| StringUtils.equalsIgnoreCase(error, "access_denied")) {
			System.out.println("Error :" + error);
			resp.sendRedirect("/register");
			return;
		}

		// Check for the code(response_type)
		if (StringUtils.isBlank(code)) {
			try {
				setupOAuth(req, resp);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return;
		}

		// Get access token do appropriate action
		try {
			getTokenAndAccessServerData(req, resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return;

	}

	private void getTokenAndAccessServerData(HttpServletRequest req,
			HttpServletResponse resp) throws Exception {

		String code = req.getParameter("code");
		System.out.println("Code test 1");
		System.out.println("Code " + code);
		OAuthRequest oAuthRequest = null;

		// To get access token
		oAuthRequest = new OAuthRequest(Verb.POST, String.format(
				FacebookAPI.FACEBOOK_ACCESS_TOKEN_URL, MY_RETURN_URL, code,
				"authorization_code"));

		oAuthRequest.addHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
		oAuthRequest.addHeader("Accept", "application/json");

		Response response = oAuthRequest.send();
		System.out.println("accessToken0 = " + response.toString());

		HashMap<String, String> properties = (HashMap<String, String>) URLUtil
				.getQueryMap(response.getBody());

		String accessToken = properties.get("access_token");

		System.out.println("accessToken = " + accessToken);

		if (StringUtils.isBlank(accessToken))
			return;

		// Get facebook user details and page details
		JSONObject responseJSON = getFacebookUserAndPageDetails(req, resp, accessToken);
		if(responseJSON == null)
			return;
		
		
       // req.setAttribute("facebook_user_details", responseJSON);
		
		
		// Set session to fetch the user details While registering the user SocialPrefs
		req.getSession().setAttribute(SERVICE_TYPE_FACEBOOK_SESSION, responseJSON.toString());

		req.getRequestDispatcher("/facebook.jsp").forward(req, resp);

		
		
	}

	private void setupOAuth(HttpServletRequest req, HttpServletResponse resp)
			throws Exception {
		String serviceType = req.getParameter("service");

		System.out.println("serviceType 1 = " + serviceType);

		OAuthService service = getService(req, resp);

		System.out.println("service 1 = " + service);

		String url = service.getAuthorizationUrl(null);

		System.out.println("url 1 = " + url);

		// Redirect URL
		resp.sendRedirect(url);
	}

	private OAuthService getService(HttpServletRequest req,
			HttpServletResponse resp) {
		// Gets callback url
		String callback = req.getRequestURL().toString();

		System.out.println("callback url in get Service" + callback);

		OAuthService service = null;

		service = new ServiceBuilder().provider(FacebookAPI.class)
				.callback(callback).apiKey(FacebookAPI.FACEBOOK_CLIENT_ID)
				.apiSecret(FacebookAPI.FACEBOOK_CLIENT_SECRET).build();

		return service;
	}

	public JSONObject getFacebookUserAndPageDetails(HttpServletRequest req,
			HttpServletResponse resp, String accessToken) throws Exception {

		if (StringUtils.isBlank(accessToken))
			return null;

		String userDetailsURL = String.format(
				FacebookAPI.FACEBOOK_USER_DETAILS_URL, accessToken);

		System.out.println("userDetailsURL 1 = " + userDetailsURL);

		String userDetailsResponseString = HTTPUtil.accessURL(userDetailsURL);

		System.out.println("userDetailsResponseString 1 = "
				+ userDetailsResponseString);

		JSONObject userDetailsJSON = new JSONObject(userDetailsResponseString);

		System.out.println("userDetailsJSON 1 = " + userDetailsJSON);

		// Get user facebook id
		String facebookId = JSONUtil.getJSONValue(userDetailsJSON, "id");

		if (StringUtils.isBlank(facebookId))
			return null;

		// To get user page details
		String pageDetailsURL = String.format(FacebookAPI.FACEBOOK_PAGES_URL,
				facebookId, accessToken);

		System.out.println("pageDetailsURL 1 = " + pageDetailsURL);

		String pageDetailsResponseString = HTTPUtil.accessURL(pageDetailsURL);

		System.out.println("pageDetailsResponseString 1 = "
				+ pageDetailsResponseString);

		JSONObject pageDetailsJSON = new JSONObject(pageDetailsResponseString);

		System.out.println("pageDetailsJSON 1 = " + pageDetailsJSON);

		JSONObject[] jsonObjectArray = new JSONObject[] { userDetailsJSON,
				pageDetailsJSON };

		JSONObject resultJSON = JSONUtil.mergeJSONs(jsonObjectArray);
		resultJSON.put("access_token", accessToken);

		System.out.println("resultJSON 1 = " + resultJSON);

		return resultJSON;
	}
}