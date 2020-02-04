package com.example.demo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class DbEnt {
     @Id
     @GeneratedValue
     private Integer num;

     private String name;
}
