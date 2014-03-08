package com.reviewdesk.reviews;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.reviewdesk.db.ObjectifyGenericDao;

public class ReviewUtil {
	
	static ObjectifyGenericDao<Reviews> dao = new ObjectifyGenericDao<Reviews>(Reviews.class);
	
	public static List<Reviews> getReviewsByQueryAndCursor(int max, String cursor, Map<String, Object> map){
		
		List<Reviews> reviewsList = new ArrayList<>();
		
		
		
		if(StringUtils.isBlank(cursor))
		reviewsList = dao.listByPropertyAndLimit(map, max);
		else
			reviewsList = dao.fetchAllByOrder(max, cursor, map, false, false, null);
		
		return reviewsList;
		
	}

}
