package com.reviewdesk.social;

import java.util.ArrayList;

import javax.persistence.Id;

import com.reviewdesk.db.ObjectifyGenericDao;

public class SocialPrefs {

	@Id
	public Long id;
	
	
	// public Long user_id;
	public String facebook;
	// public String facebook_user_details;
	// public String facebook_page_datails;
	// public String twitter;
	// public String twitter_user_details;
	
    ObjectifyGenericDao<SocialPrefs> dao = new ObjectifyGenericDao<SocialPrefs>(SocialPrefs.class);
    
    public SocialPrefs() {
	}

	public SocialPrefs(String asd) {

		this.facebook = asd;
	}


	
	/**
	 * Saves a user in the database
	 */
	public void save() {
		dao.put(this);
	}
	

}
