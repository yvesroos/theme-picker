package com.yvesroos.colors;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
class LoadDatabase {
  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(HTMLColorRepository repository) {    
    return args -> {
      ObjectMapper mapper = new ObjectMapper();
      TypeReference<List<HTMLColor>> typeReference = new TypeReference<List<HTMLColor>>(){};
      InputStream inputStream = TypeReference.class.getResourceAsStream("/colors.json");
      try {
          List<HTMLColor> htmlColors = mapper.readValue(inputStream,typeReference);
          repository.saveAll(htmlColors);
          log.info("Database fed with " + htmlColors.size() + " records");
          System.out.println("Colors Saved!");
      } catch (IOException e){
          System.out.println("Unable to save colors: " + e.getMessage());
      }
    };
  }
}