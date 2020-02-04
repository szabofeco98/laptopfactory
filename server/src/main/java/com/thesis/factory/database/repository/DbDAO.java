package com.thesis.factory.database.repository;

import com.thesis.factory.database.entity.DbEnt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DbDAO extends JpaRepository<DbEnt,Integer> {
}
