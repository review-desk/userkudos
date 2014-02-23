package com.reviewdesk.social;

import org.scribe.builder.api.DefaultApi20;
import org.scribe.model.OAuthConfig;

public class FacebookAPI extends DefaultApi20 {

	private static final String AUTHORIZE_URL = "https://www.facebook.com/dialog/oauth?client_id=%s&redirect_uri=%s&display=popup&scope=email&response_type=code";
	private static final String ACCESS_TOKEN_URL = "https://api.nimble.com/oauth/token";
	public static final String FACEBOOK_CLIENT_ID = "601471116591722";
	public static final String FACEBOOK_CLIENT_SECRET = "950d50f8cd8aeeeaf5b08478fff95a3a";

	public static final String FACEBOOK_ACCESS_TOKEN_URL = "https://graph.facebook.com/oauth/access_token?client_id="
			+ FACEBOOK_CLIENT_ID
			+ "&client_secret="
			+ FACEBOOK_CLIENT_SECRET
			+ "&redirect_uri=%s&code=%s&grant_type=%s";

	// To get user details, require access token
	public static final String FACEBOOK_USER_DETAILS_URL = "https://graph.facebook.com/me?fields=id,name,email&access_token=%s";

	// To get user facebook pages, require user id and access token
	public static final String FACEBOOK_PAGES_URL = "https://graph.facebook.com/%s/accounts?access_token=%s";
	
	// To get user facebook pages, require user id and access token
		public static final String FACEBOOK_LONG_LIVE_ACCESS_TOKEN_URL = "https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id="+FACEBOOK_CLIENT_ID+"&client_secret="+FACEBOOK_CLIENT_SECRET+"&fb_exchange_token=%s";
		
	// To get user facebook page feeds, require page id and access token
	public static final String FACEBOOK_PAGE_FEED_URL = "https://graph.facebook.com/398626230269303/feed?access_token=%s";

	@Override
	public String getAccessTokenEndpoint() {
		return ACCESS_TOKEN_URL;
	}

	@Override
	public String getAuthorizationUrl(OAuthConfig config) {
		System.out.println(config.getCallback());
		return String.format(AUTHORIZE_URL, config.getApiKey(),
				config.getCallback());
	}
}