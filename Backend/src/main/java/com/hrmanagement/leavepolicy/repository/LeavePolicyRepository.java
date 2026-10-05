package com.hrmanagement.leavepolicy.repository;

import com.hrmanagement.leavepolicy.entity.LeavePolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeavePolicyRepository
        extends JpaRepository<LeavePolicy, Long> {
}