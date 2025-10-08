package net.broadcast.chatting;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.tomcat.servlet.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.servlet.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
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

	// @Bean
	// public ServletWebServerFactory serverContainer() {
	// 	// Enable SSL Trafic
	// 	TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
	// 		@Override
	// 		protected void postProcessContext(Context context) {
	// 			SecurityConstraint securityConstraint = new SecurityConstraint();
	// 			securityConstraint.setUserConstraint("CONFIDENTIAL");
	// 			SecurityCollection collection = new SecurityCollection();
	// 			collection.addPattern("/*");
	// 			securityConstraint.addCollection(collection);
	// 			context.addConstraint(securityConstraint);
	// 		}
	// 	};

	// 	// Add HTTP to HTTPS redirection
	// 	tomcat.addAdditionalConnectors(httpToHttpsRedirectConnector());

	// 	return tomcat;
	// }

	// private Connector httpToHttpsRedirectConnector() {
	// 	Connector connector = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
	// 	connector.setScheme("http");
	// 	connector.setPort(8080);
	// 	connector.setSecure(false);
	// 	connector.setRedirectPort(8443);
	// 	return connector;
	// }

}
