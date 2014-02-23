package com.reviewdesk.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;

import com.google.appengine.api.datastore.EntityNotFoundException;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Query;
import com.googlecode.objectify.util.DAOBase;
import com.reviewdesk.social.SocialPrefs;
import com.reviewdesk.user.Users;

public class ObjectifyGenericDao<T> extends DAOBase {

	static {

		ObjectifyService.register(Users.class);
	    ObjectifyService.register(SocialPrefs.class);
		// ObjectifyService.register(UIPrefs.class);

	}

	/**
	 * Stores class name with ".class" extension
	 */
	protected Class<T> clazz;

	public ObjectifyGenericDao(Class<T> clazz) {
		// TODO Auto-generated constructor stub
		this.clazz = clazz;
	}

	public Key<T> put(T entity) {
		return ofy().put(entity);
	}

	/**
	 * Stores multiple entities of same type
	 * 
	 * @param entities
	 * @return map of keys of saved entites
	 */
	public Map<Key<T>, T> putAll(Iterable<T> entities) {
		return ofy().put(entities);
	}

	/**
	 * Deletes an entity from database
	 * 
	 * @param entity
	 */
	public void delete(T entity) {
		ofy().delete(entity);
	}

	/**
	 * Deletes an entity based on its Key
	 * 
	 * @param entityKey
	 */
	public void deleteKey(Key<T> entityKey) {
		ofy().delete(entityKey);
	}

	/**
	 * Deletes all the given entities of a type
	 * 
	 * @param entities
	 */
	public void deleteAll(Iterable<T> entities) {
		ofy().delete(entities);
	}

	/**
	 * Deletes the entities of a type based on their Keys
	 * 
	 * @param keys
	 */
	public void deleteKeys(Iterable<Key<T>> keys) {
		ofy().delete(keys);
	}

	/**
	 * Deletes keys by Ids
	 * 
	 * @param ids
	 */
	public void deleteBulkByIds(JSONArray ids) {
		List<Key<T>> keys = new ArrayList<Key<T>>();

		// Add keys
		for (int i = 0; i < ids.length(); i++) {
			try {
				String keyString = ids.getString(i);
				Long key = Long.parseLong(keyString);

				// Adds to keys list
				keys.add(new Key<T>(clazz, key));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		// Deletes all
		deleteKeys(keys);
	}

	/**
	 * Fetches an entity based on its id
	 * 
	 * @param id
	 * @return an entity of specified type (T)
	 * @throws EntityNotFoundException
	 */
	public T get(Long id) throws EntityNotFoundException {
		return ofy().get(this.clazz, id);
	}

	/**
	 * Fetches an entity based on its Key
	 * 
	 * @param key
	 * @return
	 * @throws EntityNotFoundException
	 */
	public T get(Key<T> key) throws EntityNotFoundException {
		return ofy().get(key);
	}

	/**
	 * Convenience method to get an object matching a single property
	 * 
	 * @param propName
	 * @param propValue
	 * @return T matching Object
	 */
	public T getByProperty(String propName, Object propValue) {

		Query<T> q = ofy().query(clazz);
		q.filter(propName, propValue);
		return q.get();
	}

	/**
	 * Convenience method to get an object matching to multiple properties
	 * 
	 * @param map
	 * @return T matching object
	 */
	public T getByProperty(Map<String, Object> map) {
		Query<T> q = ofy().query(clazz);
		for (String propName : map.keySet()) {
			q.filter(propName, map.get(propName));
		}
		return q.get();
	}

	/**
	 * Convenience method to get number of entities based on a property
	 * 
	 * @param map
	 * @return T matching object
	 */
	public int getCountByProperty(String propName, Object propValue) {
		Query<T> q = ofy().query(clazz);
		q.filter(propName, propValue);
		return q.count();
	}

	/**
	 * Convenience method to get number of entities based on properties map
	 * 
	 * @param map
	 * @return T matching object
	 */
	public int getCountByProperty(Map<String, Object> map) {
		Query<T> q = ofy().query(clazz);
		for (String propName : map.keySet()) {
			q.filter(propName, map.get(propName));
		}
		return q.count();
	}

	/**
	 * Convenience method to get all objects matching a single property
	 * 
	 * @param propName
	 * @param propValue
	 * @return list of T matching objects
	 */
	public List<T> listByProperty(String propName, Object propValue) {
		Query<T> q = ofy().query(clazz);
		q.filter(propName, propValue);
		return asList(q.fetch());
	}

	/**
	 * Convenience method to get all objects matching to multiple properties
	 * 
	 * @param map
	 * @return list of T matching objects
	 */
	public List<T> listByProperty(Map<String, Object> map) {
		Query<T> q = ofy().query(clazz);
		for (String propName : map.keySet()) {
			q.filter(propName, map.get(propName));
		}

		return asList(q.fetch());
	}

	/**
	 * Fetches all the entities of type T
	 * 
	 * @return list of all T objects
	 */
	public List<T> fetchAll() {
		Query<T> q = ofy().query(clazz);
		return asList(q.fetch());
	}

	/**
	 * Fetches entities based on keysList
	 * 
	 * @param keysList
	 * @return List of T entities
	 */
	public List<T> fetchAllByKeys(List<Key<T>> keysList) {
		return asList(ofy().get(keysList).values());
	}

	/**
	 * Gets count of entities of a particular type T
	 * 
	 * @return number of entities
	 */
	public int count() {
		Query<T> q = ofy().query(clazz);
		return q.count();
	}

	/**
	 * public List<T> fetchAll(int max, String cursor, Map<String, Object> map,
	 * boolean forceLoad) { if (!forceLoad) return fetchAll(max, cursor, map);
	 * 
	 * System.out.println("cached result : " +
	 * CacheUtil.getCache(this.clazz.getSimpleName() + "_" +
	 * NamespaceManager.get() + "_count"));
	 * CacheUtil.deleteCache(this.clazz.getSimpleName() + "_" +
	 * NamespaceManager.get() + "_count"); return fetchAll(max, cursor, map); }
	 * */

	/**
	 * Convenience method to get list of keys matching a single property
	 * 
	 * @param propName
	 * @param propValue
	 * @return list of keys of type T
	 */
	public List<Key<T>> listKeysByProperty(String propName, Object propValue) {
		Query<T> q = ofy().query(clazz);
		q.filter(propName, propValue);
		return asKeyList(q.fetchKeys());
	}

	public List<Key<T>> listAllKeys() {
		Query<T> q = ofy().query(clazz);
		return asKeyList(q.fetchKeys());
	}

	/**
	 * Convenience method to get list of keys matching to multiple properties
	 * 
	 * @param map
	 * @return list of keys of type T
	 */
	public List<Key<T>> listKeysByProperty(Map<String, Object> map) {
		Query<T> q = ofy().query(clazz);
		for (String propName : map.keySet()) {
			q.filter(propName, map.get(propName));
		}
		return asKeyList(q.fetchKeys());
	}

	/**
	 * List keys by property with order specified
	 * 
	 * @param map
	 * @return
	 */
	public List<Key<T>> listKeyByProperty(Map<String, Object> map,
			String orderBy, Integer limit) {
		Query<T> q = ofy().query(clazz);
		for (String propName : map.keySet()) {
			q.filter(propName, map.get(propName));
		}
		if (limit != null)
			q.limit(limit);
		q.order(orderBy);
		return asKeyList(q.fetchKeys());
	}

	/**
	 * Makes the given entities as a list
	 * 
	 * @param iterable
	 * @return list of entities
	 */
	private List<T> asList(Iterable<T> iterable) {
		ArrayList<T> list = new ArrayList<T>();
		for (T t : iterable) {
			list.add(t);
		}
		return list;
	}

	/**
	 * Makes the given keys as a list
	 * 
	 * @param iterableKeys
	 * @return list of keys
	 */
	private List<Key<T>> asKeyList(Iterable<Key<T>> iterableKeys) {
		ArrayList<Key<T>> keys = new ArrayList<Key<T>>();
		for (Key<T> key : iterableKeys) {
			keys.add(key);
		}
		return keys;
	}

}
