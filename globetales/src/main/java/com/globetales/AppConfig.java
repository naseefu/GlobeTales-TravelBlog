package com.globetales;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.util.unit.DataSize;
import org.springframework.web.client.RestTemplate;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import jakarta.servlet.MultipartConfigElement;

@Configuration
public class AppConfig {
	
	@Autowired
	private Environment env;
	
	@Bean(name="javaMailSender")
	public JavaMailSender getJavaMailSender() {
		
		JavaMailSenderImpl javaMailSenderImpl = new JavaMailSenderImpl();
		javaMailSenderImpl.setHost("smtp.gmail.com");
		javaMailSenderImpl.setUsername("eventuraoo07@gmail.com");
		javaMailSenderImpl.setPassword("njdrlbfwqzvdkzxg");
		javaMailSenderImpl.setPort(587);
		
		javaMailSenderImpl.setJavaMailProperties(getProperties());
		
		return javaMailSenderImpl;
	}
	
	
	int getIntProperty(String key) {
		
		String property = env.getProperty(key);
		return Integer.parseInt(property);
		
	}
	
	private Properties getProperties() {
		Properties mailProperties = new Properties();
		mailProperties.put("mail.smtp.starttls.enable", true);
		mailProperties.put("mail.smtp.auth", true);
		mailProperties.put("mail.smtp.ssl.trust","smtp.gmail.com");
		return mailProperties;
	}
	
	@Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
	
	@Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
            "cloud_name", "dlmy12woo",
            "api_key", "794148344422546",
            "api_secret", "oS193SlKqUtICqYsSB43va4jEFg"
        ));
    }
	
	@Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize(DataSize.ofMegabytes(10)); // Set maximum file size
        factory.setMaxRequestSize(DataSize.ofMegabytes(20)); // Set maximum request size
        return factory.createMultipartConfig();
    }
	
	
}
