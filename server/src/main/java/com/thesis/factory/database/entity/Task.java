package com.thesis.factory.database.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Employee employee;
}
