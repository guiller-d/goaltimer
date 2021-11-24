package com.example.springrest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
class SpringRestApplicationTests {

	private RestTemplate restTemplate = new RestTemplate();

	@Test
	void contextLoads() {
		ResponseEntity<String> responseDtoResponse = 
		restTemplate.getForEntity("http://www.google.com", String.class);

		assertThat(responseDtoResponse.getStatusCode().value()).isEqualTo(200);	
	}

}
