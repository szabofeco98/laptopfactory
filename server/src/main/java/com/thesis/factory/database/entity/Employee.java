package com.thesis.factory.database.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
public class Employee {
        @Id
        @GeneratedValue
        private Long id;

        @ManyToOne
        private Role role;

        private String username;

        private String password;

        private int shitNum;

        private Date bornDate;

        @ManyToMany(fetch = FetchType.EAGER)
        private List<WorkingHour> workingHours;
}
