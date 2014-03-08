package com.reviewdesk.reviews;

import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.NotSaved;
import com.googlecode.objectify.condition.IfDefault;
import com.reviewdesk.db.ObjectifyGenericDao;


@XmlRootElement
public class Reviews {


	@Id
	public Long id;
	
	
	public Long user_id;
	
	public Long updated_time;
	
	@NotSaved(IfDefault.class)
	public String name = null;
	
	@NotSaved(IfDefault.class)
	public String email = null;

	public String rating;

	public String title;
	
	public String message;

	// Dao
	public static ObjectifyGenericDao<Reviews> dao = new ObjectifyGenericDao<Reviews>(
			Reviews.class);

	public Reviews() {
	}

	/**
	 * Saves a user in the database
	 */
	public void save() {
		dao.put(this);
	}
}
