package com.reviewdesk.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.appengine.api.datastore.Text;

public class URLUtil {

	// Read Resource from File (war)
	public static String readResource(String path) {
		try {
			// System.out.println(path);
			File f = new File(path);
			if (!f.exists()) {
				System.out.println("File does not exist");
				return null;
			}

			InputStream is = new FileInputStream(f);

			return IOUtils.toString(is, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// Send Email

	// public static String sendMail(String fromEmail, String fromName, String
	// to,
	// String subject, String replyTo, String html, String text) {
	// return SendGridEmail.sendMail(fromEmail, fromName, to, subject,
	// replyTo, html, text, null, null);
	//
	// }

	/**
	 * Constructs the map object with the query params
	 * 
	 * @param query
	 * @return
	 */
	public static Map<String, String> getQueryMap(String query) {
		String[] params = query.split("&");
		Map<String, String> map = new HashMap<String, String>();
		for (String param : params) {
			if (StringUtils.isBlank(param) || param.length() < 2)
				continue;

			String name = param.split("=")[0];
			String value = param.split("=")[1];
			map.put(name, value);
		}
		return map;
	}

	/**
	 * Returns the value of the url quey param
	 * 
	 * @param url
	 * @param paramName
	 * @return
	 */
	public static String getURLQueryParam(String url, String paramName) {
		try {
			URL javaURL = new URL(StringEscapeUtils.unescapeHtml(url));

			Map<String, String> map = getQueryMap(javaURL.getQuery());

			Set<String> keys = map.keySet();
			for (String key : keys) {

				if (key.equals(paramName))
					return map.get(key);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * Converts the Exception stack trace into String
	 * 
	 * @param exception
	 *            - Exception object
	 * @return String representation of Exception trace
	 */
	public static String getExceptionStackTraceAsString(Exception exception) {

		StringWriter sw = new StringWriter();

		exception.printStackTrace(new PrintWriter(sw));

		return sw.toString();
	}

	public static HashMap getDefaultPlanMap() {

		HashMap<Integer, ArrayList<String>> defaultMap = new HashMap<Integer, ArrayList<String>>();
		for (int i = 1; i <= 20; i++) {
			defaultMap.put(i, new ArrayList<String>());
		}

		return defaultMap;
	}

	public static Object escapeToJavascript(final Object entity) {

		if (entity == null)
			return entity;

		if (entity instanceof JSONArray) {
			final JSONArray array = (JSONArray) entity;

			return new JSONArray() {
				{
					for (int i = 0; i < array.length(); i++) {
						try {
							put(escapeToJavascript(array.get(i)));
						} catch (Exception e) {
							// TODO: handle exception
						}

					}
				}
			};
		} else if (entity instanceof JSONObject) {

			final JSONObject json = (JSONObject) entity;

			return new JSONObject() {
				{

					for (Iterator<String> i = json.keys(); i.hasNext();) {
						String key = i.next();
						try {
							put(key, escapeToJavascript(json.get(key)));
						} catch (Exception e) {
							// TODO: handle exception
						}

					}

				}
			};

		} else if (entity instanceof Text) {
			return entity;
		}

		else if (entity instanceof String) {
			try {
				return URLDecoder.decode(
						StringEscapeUtils.escapeJavaScript((String) entity),
						"UTF-8");

			} catch (Exception e) {
				return StringEscapeUtils.escapeJavaScript((String) entity);
			}

		}

		return entity;
	}

}
