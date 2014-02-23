package com.reviewdesk.social;

import javax.persistence.Id;

import com.reviewdesk.db.ObjectifyGenericDao;

public class SocialPrefs {

	@Id
	public Long id;

	public Long user_id;
	public Boolean facebook;
	public String facebook_user_details;
	public String facebook_page_datails;
	public Boolean twitter;
	public String twitter_user_details;

	// Dao
	public static ObjectifyGenericDao<SocialPrefs> dao = new ObjectifyGenericDao<SocialPrefs>(
			SocialPrefs.class);

	public SocialPrefs() {
	}

	public SocialPrefs(String userId, String password, String userName,
			String address, Long signupDate, String emailVerification,
			String signupType) {
	}

	/**
	 * Saves a user in the database
	 */
	public void save() {
		dao.put(this);
	}
}
