package com.yvesroos.colors;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
class HTMLColor {

  private @Id String name;
  private String rgb;

  HTMLColor() {}

  HTMLColor(String name, String rbg) {

    this.name = name;
    this.rgb = rgb;
  }

  public String getName() {
    return this.name;
  }

  public String getRgb() {
    return rgb;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setRgb(String rgb) {
    this.rgb = rgb;
  }
  

  // @Override
  // public boolean equals(Object o) {

  //   if (this == o)
  //     return true;
  //   if (!(o instanceof Employee))
  //     return false;
  //   Employee employee = (Employee) o;
  //   return Objects.equals(this.id, employee.id) && Objects.equals(this.name, employee.name)
  //       && Objects.equals(this.role, employee.role);
  // }

  // @Override
  // public int hashCode() {
  //   return Objects.hash(this.id, this.name, this.role);
  // }

  @Override
  public String toString() {
    return "HTMLColor{" + "name='" + this.name + '\'' + ", HEX COLOR='" + this.rgb + '\'' + '}';
  }
}