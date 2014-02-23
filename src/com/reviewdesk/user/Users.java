package com.reviewdesk.user;

import javax.persistence.Id;

import com.reviewdesk.db.ObjectifyGenericDao;

public class Users {

	@Id
	public Long id;
	public String user_id;
	public String password;
	public String user_name;

	public String address;

	public Long signup_date;
	public String email_verification;
	public String signup_type;

	// Dao
	public static ObjectifyGenericDao<Users> dao = new ObjectifyGenericDao<Users>(
			Users.class);

	public Users() {
	}

	public Users(String userId, String password, String userName,
			String address, Long signupDate, String emailVerification,
			String signupType) {

		this.user_id = userId;
		this.password = password;
		this.user_name = userName;
		this.address = address;
		this.signup_date = signupDate;
		this.email_verification = emailVerification;
		this.signup_type = signupType;

	}

	/**
	 * Saves a user in the database
	 */
	public void save() {
		dao.put(this);
	}
}
