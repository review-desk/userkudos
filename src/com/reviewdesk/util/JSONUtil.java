package com.reviewdesk.util;

import java.util.Iterator;

import org.json.JSONObject;

public class JSONUtil {

	// Returns value of an element in JSON. If not present or null, returns ""
	public static String getJSONValue(JSONObject jsonObject, String propertyName) {

		if (jsonObject == null || propertyName == null)
			return "";

		if (!jsonObject.has(propertyName))
			return "";

		try {
			return StringUtil.parseText(jsonObject.getString(propertyName));
		} catch (Exception e) {
			return "";
		}
	}

	public static JSONObject mergeJSONs(JSONObject[] objs) {
		JSONObject merged = new JSONObject();
		try {
			for (JSONObject obj : objs) {
				Iterator it = obj.keys();
				while (it.hasNext()) {
					String key = (String) it.next();
					merged.put(key, obj.get(key));
				}
			}
		} catch (Exception e) {
		}

		return merged;
	}

	// public static JSONObject clubTwoJSONObjects(JSONObject objectJSON1,
	// JSONObject objectJSON2) throws JSONException {
	// if (objectJSON1 == null && objectJSON2 == null)
	// return null;
	//
	// if (objectJSON1 == null)
	// return objectJSON2;
	//
	// if (objectJSON2 == null)
	// return objectJSON1;
	//
	// // Iterate through JSONObject
	// @SuppressWarnings("unchecked")
	// Iterator<String> itr = objectJSON2.keys();
	// while (itr.hasNext()) {
	//
	// try {
	// // Get Property Name
	// String propertyName = itr.next();
	//
	// // Set property - do not store key
	// String value = JSONUtil.getJSONValue(objectJSON2, propertyName);
	//
	// if (StringUtils.isBlank(propertyName)
	// || StringUtils.isBlank(value))
	// continue;
	//
	// objectJSON1.put(propertyName, value);
	//
	// } catch (Exception e) {
	// // TODO: handle exception
	// }
	//
	// }
	//
	// return objectJSON1;
	//
	// }

}
