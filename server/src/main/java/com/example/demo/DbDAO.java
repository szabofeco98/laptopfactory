package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DbDAO extends JpaRepository<DbEnt,Integer> {
}
