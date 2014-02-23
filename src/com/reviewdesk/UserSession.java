package com.reviewdesk;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;

import com.reviewdesk.util.URLUtil;

/**
 * Simple representation of an authenticated user.
 */
public class UserSession implements Serializable {

	private String claimID;
	private String email;
	private String name;

	public UserSession() {
	}

	public UserSession(String claimID, String email, String name) {

		this.claimID = (String) URLUtil.escapeToJavascript(claimID);
		this.email = (String) URLUtil.escapeToJavascript(StringUtils
				.lowerCase(email));
		this.name = (String) URLUtil.escapeToJavascript(StringUtils
				.lowerCase(name));

	}

	public String getClaimId() {
		return this.claimID;
	}

	public String getEmail() {
		return this.email;
	}

	public String getName() {
		return this.name;
	}
}
