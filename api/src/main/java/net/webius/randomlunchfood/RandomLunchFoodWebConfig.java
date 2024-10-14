package net.webius.randomlunchfood;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

		List<String> uploadResourceLocations = new ArrayList<>();
		uploadResourceLocations.add("file:" + System.getenv("UPLOAD_PATH"));
		uploadResourceLocations.add("file:/usr/local/tomcat/webapps/uploads/");
		uploadResourceLocations.add("classpath:/upload/");
		registry
			.addResourceHandler("/upload/**")
			.addResourceLocations(uploadResourceLocations.stream().filter(Objects::nonNull).toArray(String[]::new))
			.setCachePeriod(20);
	}	
}
