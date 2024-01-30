package com.yvesroos.colors;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
class HTMLColorController {

  private final HTMLColorRepository repository;

  HTMLColorController(HTMLColorRepository repository) {
    this.repository = repository;
  }


  // Aggregate root
  // tag::get-aggregate-root[]
  @CrossOrigin(origins = "*", allowedHeaders = "*")
  @GetMapping("/colors")
  ColorsResponseDTO all(@RequestParam Optional<String> q) {
    List<HTMLColor> colors;
    if (q.isPresent()) {
      colors = repository.findByNameStartsWith(q);
    } else {
      colors = repository.findAll();
    }
    ColorsResponseDTO colorsResponseDTO = new ColorsResponseDTO(colors);
    return colorsResponseDTO;
  }
  // end::get-aggregate-root[]
}