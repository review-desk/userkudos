package com.reviewdesk.social;

import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.reviewdesk.openid.ScribeOpenIdServlet;
import com.reviewdesk.user.UserUtil;
import com.reviewdesk.user.Users;
import com.reviewdesk.util.JSONUtil;

public class SocialPrefsUtil {

	public static SocialPrefs createSocialPrefs(HttpServletRequest request,
			Users user, String signupType) throws Exception {
		// TODO Auto-generated method stub

		if (StringUtils.isBlank(signupType) || StringUtils.equalsIgnoreCase(signupType, "reviewdesk") || user == null)
			return null;

		System.out.println("userID = createSocialPrefs= " + user.user_id);

		SocialPrefs socialPrefs = new SocialPrefs();
		socialPrefs.user_id = user.id;

		if (StringUtils.equalsIgnoreCase(signupType,
				UserUtil.USER_DB_SIGNUP_TYPE_FACEBOOK)) {
			
			socialPrefs = createFacebookSocialPrefs(request);
			

			// Do some thing
		} else if (StringUtils.equalsIgnoreCase(signupType,
				UserUtil.USER_DB_SIGNUP_TYPE_TWITTER)) {
			// Do Some thing
		}
		
		
		socialPrefs.save();
		
		
		return socialPrefs;

	}

	private static SocialPrefs createFacebookSocialPrefs(HttpServletRequest request) throws Exception {
		// TODO Auto-generated method stub
		
		// Get facebook user details from session
					String facebookUserDetails = (String) request.getSession().getAttribute(ScribeOpenIdServlet.SERVICE_TYPE_FACEBOOK_SESSION);
					
					System.out.println("facebookUserDetails = from session = " + facebookUserDetails);
					
					JSONObject facebookJSON = new JSONObject(facebookUserDetails);
					
					SocialPrefs socialPrefs = new SocialPrefs();
					socialPrefs.facebook = true;
					
					
					JSONObject facebookUserDetailJSON = new JSONObject();
					
					facebookUserDetailJSON.put("id", JSONUtil.getJSONValue(facebookJSON, "id"));
					facebookUserDetailJSON.put("name", JSONUtil.getJSONValue(facebookJSON, "name"));
					facebookUserDetailJSON.put("email", JSONUtil.getJSONValue(facebookJSON, "email"));
					
					String longLivedAccessToken = FacebookUtil.getExtendedPermissionAccessToken(JSONUtil.getJSONValue(facebookJSON, "access_token"));
					

					// Calculate token expiry
					Calendar cal = Calendar.getInstance();
					Long expiry = cal.getTimeInMillis();
					
					if(StringUtils.isBlank(longLivedAccessToken)){
						
						longLivedAccessToken = JSONUtil.getJSONValue(facebookJSON, "access_token");
						
						// Calculate token expiry
						cal.add(Calendar.DATE, 50);
						expiry = cal.getTimeInMillis();
						
					}
					
					// Get extended permissions access token
					facebookUserDetailJSON.put("access_token", longLivedAccessToken);
					facebookUserDetailJSON.put("expiry", expiry + "");
					
                    System.out.println("facebookUserDetailJSON = while registering" + facebookUserDetailJSON);
					
					
					facebookUserDetailJSON.put("expiry", expiry + "");
					
					System.out.println("facebookUserDetailJSON = " + facebookUserDetailJSON);
					
					socialPrefs.facebook_user_details = facebookUserDetailJSON.toString();
					
					
					
					
					
					// get page name from id
					JSONArray pageDetailsJsonArray =(JSONArray) facebookJSON.get("data");
					
					System.out.println("pageDetailsJsonArray k = " + pageDetailsJsonArray);
					
					
					String facebookSelectedPageId = request.getParameter("facebook_pages");
					JSONObject facebookPagesJSON = new JSONObject();
					
					if(StringUtils.isBlank(facebookSelectedPageId) || pageDetailsJsonArray == null || pageDetailsJsonArray.length() == 0){
						
						socialPrefs.facebook_page_datails = facebookPagesJSON.toString();
						return socialPrefs;
					}
					
					
					for(int i =0; i < pageDetailsJsonArray.length(); i++){
						
						JSONObject eachPageJSON = pageDetailsJsonArray.getJSONObject(i);
						
						String id = JSONUtil.getJSONValue(eachPageJSON, "id");
						
						if(StringUtils.isNotBlank(id) && StringUtils.equalsIgnoreCase(id, facebookSelectedPageId))
							facebookPagesJSON.put(facebookSelectedPageId, JSONUtil.getJSONValue(eachPageJSON, "name"));
					     
					}
					
					socialPrefs.facebook_page_datails = facebookPagesJSON.toString();
					return socialPrefs;
		
	}
	public static void main(String[] args) {
		
		
	}


}

