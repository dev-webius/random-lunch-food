package net.webius.randomlunchfood;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RandomLunchFoodWebConfig implements WebMvcConfigurer {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		//WebMvcConfigurer.super.addResourceHandlers(registry);
		
		registry
			.addResourceHandler("/")
			.addResourceLocations("classpath:/static/")
			.setCachePeriod(20);
		
		registry
			.addResourceHandler("/upload/**")
			.addResourceLocations("classpath:/upload/")
			.setCachePeriod(20);
	}	
}
