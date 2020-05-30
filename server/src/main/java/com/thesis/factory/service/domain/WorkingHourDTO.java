package com.thesis.factory.service.domain;


import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString(exclude = "employees")
public class WorkingHourDTO {
    private Long id;

    private Date startDate;

    private Date endDate;

    @JsonBackReference
    private List<EmployeeDTO> employees;
}
