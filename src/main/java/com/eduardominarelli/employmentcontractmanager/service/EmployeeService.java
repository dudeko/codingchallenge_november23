package com.eduardominarelli.employmentcontractmanager.service;

import com.eduardominarelli.employmentcontractmanager.dto.EmployeeDTO;
import com.eduardominarelli.employmentcontractmanager.model.Employee;

import java.io.IOException;
import java.util.List;

public interface EmployeeService {

    List<Employee> retrieveAll() throws IOException;

    Employee save(Employee employee) throws IOException;

    void saveFromDTO(EmployeeDTO employeeDTO) throws IOException;
}
