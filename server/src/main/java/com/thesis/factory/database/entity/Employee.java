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

        @Column(unique = true)
        private String username;

        private String password;

        private Integer shitNum;

        private String email;

        private Integer identityNum;

        @Column(name = "is_active")
        private Boolean isActiveWorker;

        private Date bornDate;

        @ManyToMany(fetch = FetchType.EAGER)
        private List<WorkingHour> workingHours;

        @OneToMany(mappedBy = "employee")
        private List<Task> tasks;
}
