package com.reviewdesk.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

public class JerseyApplicationRegister extends Application{
	
		public Set<Class<?>> getClasses()
		{

			Set<Class<?>> s = new HashSet<Class<?>>();

			s.add(com.reviewdesk.rest.panel.Review.class);
			s.add(org.codehaus.jackson.jaxrs.JacksonJaxbJsonProvider.class);
			s.add(org.codehaus.jackson.jaxrs.JacksonJsonProvider.class);
			s.add(org.codehaus.jackson.jaxrs.JsonParseExceptionMapper.class);
			s.add(org.codehaus.jackson.jaxrs.JsonMappingExceptionMapper.class);

			return s;
		}

	}


