package com.thesis.factory.service.impl;


import com.thesis.factory.database.entity.Role;
import com.thesis.factory.database.repository.EmployeeDAO;
import com.thesis.factory.service.EmployeeService;
import com.thesis.factory.service.domain.EmployeeDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service("employeeService")
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeDAO employeeDAO;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List getActiv() {

        return employeeDAO.findByIsActiveWorker(true).stream()
                .map(x->modelMapper.map(x, EmployeeDTO.class))
                .collect(Collectors.toList());
    }
}
