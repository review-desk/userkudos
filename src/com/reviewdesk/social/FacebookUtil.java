package com.reviewdesk.social;

import com.reviewdesk.util.HTTPUtil;
import com.reviewdesk.util.URLUtil;

public class FacebookUtil {

	public static String getExtendedPermissionAccessToken(String shortLiveAccessToken) {
		// TODO Auto-generated method stub
		
		try {
			
			String url = String.format(
					FacebookAPI.FACEBOOK_LONG_LIVE_ACCESS_TOKEN_URL, shortLiveAccessToken);
			
			String longLivedAccessToken = HTTPUtil.accessURL(url);
			
			return URLUtil.getQueryMap(longLivedAccessToken).get("access_token");
			
		} catch (Exception e) {
			// TODO: handle exception
		return null;
		}
	}

}
