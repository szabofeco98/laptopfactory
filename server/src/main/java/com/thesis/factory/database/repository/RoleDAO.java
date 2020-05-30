package com.thesis.factory.database.repository;

import com.thesis.factory.database.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDAO extends JpaRepository<Role,Long> {
}
