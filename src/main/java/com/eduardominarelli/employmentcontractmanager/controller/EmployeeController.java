package com.eduardominarelli.employmentcontractmanager.controller;

import com.eduardominarelli.employmentcontractmanager.dto.EmployeeDTO;
import com.eduardominarelli.employmentcontractmanager.model.Employee;
import com.eduardominarelli.employmentcontractmanager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("list")
    public List<Employee> list() throws IOException {
        return employeeService.retrieveAll();
    }
    @PostMapping("save")
    public ApiResultMessage save(@ModelAttribute EmployeeDTO employeeDTO) throws IOException {
        employeeService.saveFromDTO(employeeDTO);
        return ApiResultMessage.withMessage("Employee added successfully");
    }
}