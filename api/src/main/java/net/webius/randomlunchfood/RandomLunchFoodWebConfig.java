package net.webius.randomlunchfood;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class RandomLunchFoodWebConfig implements WebMvcConfigurer {
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/**/{x:\\w+}").setViewName("/");
	}

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {		
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
