package com.reviewdesk.user;

import org.json.JSONObject;

import com.reviewdesk.email.SendEmail;

public class Verification {

	public static void sendVerificationEMail(Users user) throws Exception {

		JSONObject userJSON = new JSONObject();
		userJSON.put("user_id", user.user_id);
		userJSON.put("user_name", user.user_id);
		userJSON.put("password", user.user_id);

		SendEmail.sendEMail(user.user_id,
				SendEmail.EMAIL_TYPE_VERIFICATION_USER_SUBJECT,
				SendEmail.EMAIL_TYPE_VERIFICATION_USER, userJSON, null, null);

	}
}
