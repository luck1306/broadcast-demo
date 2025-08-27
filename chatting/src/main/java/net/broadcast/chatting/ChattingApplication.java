package net.broadcast.chatting;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@ConfigurationPropertiesScan
@EnableJpaAuditing
@SpringBootApplication
public class ChattingApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(ChattingApplication.class);
		app.setBannerMode(Banner.Mode.OFF);
		app.run(args);
	}	

}
