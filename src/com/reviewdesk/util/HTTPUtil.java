package com.reviewdesk.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

public class HTTPUtil {

	// URL
	public static String accessURL(String url) {
		try {

			URL yahoo = new URL(url);
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					yahoo.openStream()));

			String output = "";
			String inputLine;
			while ((inputLine = reader.readLine()) != null) {
				output += inputLine;
			}
			reader.close();
			return output;

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println(e.getMessage());
		}
		return null;
	}

}
