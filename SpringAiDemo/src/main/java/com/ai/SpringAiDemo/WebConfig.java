package com.ai.SpringAiDemo;

<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Value;
=======
>>>>>>> 1966c1b8194a7b2ce9d1c5062e07a20692d4fabd
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
<<<<<<< HEAD
public class WebConfig {

    // Set CORS_ALLOWED_ORIGINS env var on Render to your Netlify URL
    // e.g. https://your-app.netlify.app
    // Multiple origins can be comma-separated
    @Value("${cors.allowed.origins:http://localhost:3000}")
    private String allowedOrigins;

=======
public class WebConfig implements WebMvcConfigurer {
>>>>>>> 1966c1b8194a7b2ce9d1c5062e07a20692d4fabd
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
<<<<<<< HEAD
                registry.addMapping("/**")
                        .allowedOriginPatterns(allowedOrigins.split(","))
=======
                WebMvcConfigurer.super.addCorsMappings(registry);
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000/")
>>>>>>> 1966c1b8194a7b2ce9d1c5062e07a20692d4fabd
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
<<<<<<< HEAD
=======

>>>>>>> 1966c1b8194a7b2ce9d1c5062e07a20692d4fabd
        };
    }
}
