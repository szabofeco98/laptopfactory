package com.thesis.factory.service.domain;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class EmployeeDTO {

    private Long id;

    private RoleDTO role;

    private String username;

    private String password;

    private String email;

    private Integer identityNum;

    private Boolean isActiveWorker;

    private Integer shitNum;

    private Date bornDate;

    private List<WorkingHourDTO> workingHours;
}
