package com.yvesroos.colors;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HTMLColorRepository extends JpaRepository<HTMLColor, Long> {
  List<HTMLColor> findByNameStartsWith(Optional<String> text);
}
