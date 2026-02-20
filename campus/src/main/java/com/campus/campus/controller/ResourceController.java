package com.campus.campus.controller;

import com.campus.campus.entity.Resource;

import com.campus.campus.enums.ResourceStatus;
import com.campus.campus.enums.ResourceType;

import com.campus.campus.repository.ResourceRepository;

import com.campus.campus.service.ResourceService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
public class ResourceController {

    private final ResourceService resourceService;
    private final ResourceRepository resourceRepository;

    // CREATE Resource
    @PostMapping
    public Resource createResource(@RequestBody Resource resource) {
        return resourceService.create(resource);
    }

    // GET All Resources
    @GetMapping
    public List<Resource> getAllResources() {
        return resourceService.getAll();
    }

    @GetMapping("/filter/type")
    public List<Resource> filterByType(@RequestParam(name = "type") ResourceType type) {
        return resourceService.filterByType(type);
    }

    @GetMapping("/filter/status")
    public List<Resource> filterByStatus(@RequestParam(name = "status") ResourceStatus status) {
        return resourceService.filterByStatus(status);
    }

    @GetMapping("/by-department")
    public List<Resource> getByDepartment(@RequestParam(name = "dept") String dept) {
        return resourceRepository.findByDepartment_Name(dept);
    }

    @GetMapping("/by-role")
    public List<Resource> getResourcesByRole(@RequestParam(name = "userId", required = false) String userId) {
        System.out.println("DEBUG: getResourcesByRole called with userId: " + userId);
        long count = resourceRepository.count();
        System.out.println("DEBUG: Total resources in DB: " + count);

        // Robust handling of userId: if it's null, empty, or "undefined", just return
        // all resources
        if (userId == null || userId.isEmpty() || userId.equalsIgnoreCase("undefined")
                || userId.equalsIgnoreCase("null")) {
            return resourceRepository.findAll();
        }

        try {
            Long.parseLong(userId);
            // Further logic could go here once implemented, for now return all
            return resourceRepository.findAll();
        } catch (NumberFormatException e) {
            return resourceRepository.findAll();
        }
    }

    // GET Resource By ID (Moved to avoid path conflicts with /by-role etc)
    @GetMapping("/{id}")
    public Resource getResourceById(@PathVariable(name = "id") Long id) {
        return resourceService.getById(id);
    }

    // UPDATE Resource
    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable(name = "id") Long id,
            @RequestBody Resource resource) {
        return resourceService.update(id, resource);
    }

    // DELETE Resource
    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable(name = "id") Long id) {
        resourceService.delete(id);
    }
}
