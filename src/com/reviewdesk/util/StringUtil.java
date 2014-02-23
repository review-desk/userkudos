package com.reviewdesk.util;

import java.util.Random;

public class StringUtil {

	public static String parseText(String text) {

		if (text != null) {

			try {

				text = text.replace("type='text/javascript'", "")
						.replace("type=\"text/javascript\"", "")
						.replace("type='text/css'", "")
						.replace("type=\"text/css\"", "")
						.replace("<script>", "&lt;script&gt;")
						.replace("<script >", "&lt;script&gt;")
						.replace("</script>", "&lt;/script&gt;")
						.replace("<style>", "&lt;style&gt;")
						.replace("</style>", "&lt;/style&gt;");

			} catch (Exception e) {
				// TODO: handle exception
			}

		}

		return text;
	}

	public static String generateRandomString() {

		// Long.toHexString(Double.doubleToLongBits(Math.random()));

		String allowedCharacters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		Random rnd = new Random();

		int length = 6;

		StringBuilder sb = new StringBuilder(length);
		for (int i = 0; i < length; i++)
			sb.append(allowedCharacters.charAt(rnd.nextInt(allowedCharacters
					.length())));
		return sb.toString();

	}
}
