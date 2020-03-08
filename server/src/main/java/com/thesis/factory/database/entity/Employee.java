package com.thesis.factory.database.entity;

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
public class Employee {
        @Id
        @GeneratedValue
        private Long id;
        private String username;
        private String password;
}
