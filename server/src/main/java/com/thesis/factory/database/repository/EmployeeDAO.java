package com.thesis.factory.database.repository;

import com.thesis.factory.database.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee,Long> {

}
