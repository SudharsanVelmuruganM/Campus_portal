package com.campus.campus.repository;

import com.campus.campus.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.campus.campus.enums.ResourceType;
import com.campus.campus.enums.ResourceStatus;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    List<Resource> findByType(ResourceType type);

    List<Resource> findByStatus(ResourceStatus status);

    List<Resource> findByDepartment_Name(String name);

    List<Resource> findByDepartment_NameIgnoreCase(String name);

    @org.springframework.data.jpa.repository.Query("SELECT r FROM Resource r WHERE r.department IS NULL OR r.department.name = :deptName")
    List<Resource> findGlobalAndDepartmentResources(
            @org.springframework.data.repository.query.Param("deptName") String deptName);

    List<Resource> findAllByDepartmentIsNull();
}
