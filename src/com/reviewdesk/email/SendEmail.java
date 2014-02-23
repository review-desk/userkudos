package com.reviewdesk.email;

import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.reviewdesk.util.JSONUtil;
import com.reviewdesk.util.URLUtil;

public class SendEmail {

	public static final String EMAIL_TYPE_VERIFICATION_USER_SUBJECT = "Verify your ReviewDesk account";
	public static String EMAIL_TYPE_VERIFICATION_USER = "verification";

	public static final String TEMPLATE_HTML_EXT = "-html.html";
	public static final String TEMPLATE_BODY_EXT = "-body.html";

	public static final String EMAIL_TEMPLATES_FOLDER_PATH = "email-templates/";

	public static void sendEMail(String to, String subject, String template,
			Object object, String from, String fromName) {

		try {

			String[] emailContainer = readEmailHtmlTemplate(to, subject,
					template, object, from, fromName);

			String emailBody = emailContainer[0];
			String emailHTML = emailContainer[1];

			// If both are null, nothing to be sent
			if (StringUtils.isBlank(emailBody)
					&& StringUtils.isBlank(emailHTML))
				return;

			EmailWithAppEngine.sendEmailWithAppengineEmailServer(fromName,
					fromName, to, subject, emailHTML, emailBody);

		} catch (Exception e) {
		}

	}

	public static String[] readEmailHtmlTemplate(String to, String subject,
			String template, Object object, String from, String fromName) {

		try {
			// Add email properties
			JSONObject email = new JSONObject();
			email.put("email_to", to);
			email.put("email_subject", subject);
			email.put("email_from", from);
			email.put("email_from_name", fromName);

			JSONObject[] jsonObjectArray;

			// If object to mail template is array then data of array can be
			// accessed with "content" key in template
			object = (object == null) ? new JSONObject() : object;

			if (object instanceof JSONArray) {
				JSONObject content = new JSONObject();
				content.put("content", new JSONArray(object.toString()));
				jsonObjectArray = new JSONObject[] { email, content };

			} else {
				jsonObjectArray = new JSONObject[] { email,
						new JSONObject(object.toString()) };
			}

			JSONObject mergedJSON = JSONUtil.mergeJSONs(jsonObjectArray);

			// Read template - HTML
			String emailHTML = mustacheTemplatize(template + TEMPLATE_HTML_EXT,
					mergedJSON);
			// Read template - Body
			String emailBody = mustacheTemplatize(template + TEMPLATE_BODY_EXT,
					mergedJSON);

			return new String[] { emailBody, emailHTML };
		} catch (Exception e) {
			// TODO: handle exception
			return new String[] {};
		}

	}

	static String mustacheTemplatize(String path, JSONObject json)
			throws Exception {

		// Read from path
		String emailTemplate = URLUtil.readResource(EMAIL_TEMPLATES_FOLDER_PATH
				+ path);
		if (emailTemplate == null)
			return null;

		// Compile
		return MustacheUtil.compile(emailTemplate, json);
	}

}
