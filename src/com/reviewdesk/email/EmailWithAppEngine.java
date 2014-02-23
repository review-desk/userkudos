package com.reviewdesk.email;

import java.util.Properties;
import java.util.StringTokenizer;

import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.reviewdesk.util.Globals;

public class EmailWithAppEngine {

	// Send HTML Email
	public static boolean sendEmailWithAppengineEmailServer(String from,
			String friendlyName, String to, String subject, String htmlBody,
			String textBody) {

		try {

			from = "reviewdesk@besocailbuddy.appspotmail.com";

			Properties props = System.getProperties();
			Session session = Session.getDefaultInstance(props, null);

			// -- Create a new message --
			MimeMessage message = new MimeMessage(session);

			// -- Set the FROM and TO fields --
			if (friendlyName != null)
				message.setFrom(new InternetAddress(from, friendlyName));
			else
				message.setFrom(new InternetAddress(from));

			// Set reply to (testing)
			message.setReplyTo(new InternetAddress[] { new InternetAddress(
					Globals.ADMIN_EMAIL_REPLY_TO) });

			if (to.contains(",")) {
				// Tokenize
				StringTokenizer st = new StringTokenizer(to, ",");
				boolean isFirstToken = true;
				while (st.hasMoreTokens()) {
					if (isFirstToken) {
						message.addRecipient(Message.RecipientType.TO,
								new InternetAddress(st.nextToken().trim()));
						isFirstToken = false;
					} else
						message.addRecipient(Message.RecipientType.CC,
								new InternetAddress(st.nextToken().trim()));
				}
			} else
				message.addRecipient(Message.RecipientType.TO,
						new InternetAddress(to));

			if (htmlBody != null && htmlBody.length() != 0) {

				Multipart mp = new MimeMultipart();

				MimeBodyPart htmlPart = new MimeBodyPart();
				htmlPart.setContent(htmlBody, "text/html");
				mp.addBodyPart(htmlPart);

				message.setContent(mp);

				message.setHeader("MIME-Version", "1.0");
				message.setHeader("Content-Type", mp.getContentType());
			} else if (textBody != null)
				message.setText(textBody);

			try {
				message.setSubject(subject, "UTF-8");
			} catch (Exception e) {
				// TODO: handle exception
				System.out.println(e.getMessage());
				message.setSubject(subject);
			}

			System.out.println("message = " + message);

			Transport.send(message);

			return true;

		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Email could not go " + e.getMessage());
		}

		return false;
	}

}
