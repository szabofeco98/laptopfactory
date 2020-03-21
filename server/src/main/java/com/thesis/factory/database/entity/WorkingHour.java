package com.thesis.factory.database.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
public class WorkingHour {
    @Id
    @GeneratedValue
    private Long id;

    private Date startDate;

    private Date endDate;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Employee> employees;
}
