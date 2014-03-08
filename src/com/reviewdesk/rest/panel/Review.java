package com.reviewdesk.rest.panel;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.reviewdesk.SessionManager;
import com.reviewdesk.reviews.ReviewUtil;
import com.reviewdesk.reviews.Reviews;

@Path("/reviews")
public class Review {

	
	@GET
	@Path("/recent")
	@Produces({ MediaType.APPLICATION_JSON + ";charset=utf-8",
			MediaType.APPLICATION_JSON })
	public List<Reviews> getRecentReviews() {
		
		System.out.println("in kjnk");

		Long userId = SessionManager.getUserId();
		
		System.out.println("userId = " + userId);

		if (userId == null)
			return null;

		// Get recent five reviews

		Map<String, Object> map = new HashMap<>();
		map.put("user_id", userId);

		return ReviewUtil.getReviewsByQueryAndCursor(5, null, map);

	}

}
