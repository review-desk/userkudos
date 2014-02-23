package com.reviewdesk.user;

import com.google.appengine.api.datastore.EntityNotFoundException;
import com.googlecode.objectify.Key;
import com.reviewdesk.db.ObjectifyGenericDao;

public class UserUtil {

	public static final String USER_DB_EMAIL_VERIFICATION_VERIFIED = "verified";
	public static final String USER_DB_SIGNUP_TYPE_FACEBOOK = "facebook";
	public static final String USER_DB_SIGNUP_TYPE_TWITTER = "twitter";
	public static final String USER_DB_SIGNUP_TYPE_REVIEWDESK = "reviewdesk";

	// GenericFactory<MyClass> factory = new
	// GenericFactory<MyClass>(MyClass.class);

	static ObjectifyGenericDao<Users> dao = new ObjectifyGenericDao<Users>(
			Users.class);

	public static Users getUserFromUserId(String userId) {
		// TODO Auto-generated method stub

		Users user = dao.getByProperty("user_id", userId);

		return user;

	}

	public static Users getUserFromId(Long id) throws EntityNotFoundException {
		// TODO Auto-generated method stub

		try {
			return dao.get(id);

		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}

	}

	public static Key<Users> getUSerKey(Users user) {
		// TODO Auto-generated method stub

		Key<Users> key = new Key<Users>(Users.class, user.id);

		return key;

	}
}
