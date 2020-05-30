package com.thesis.factory.service.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString(exclude = "employees")
public class RoleDTO {
    private Long id;

    @JsonBackReference
    private List<EmployeeDTO> employees;

    private String Role;
}
