package com.eduardominarelli.employmentcontractmanager.service;

import com.eduardominarelli.employmentcontractmanager.dto.EmployeeDTO;
import com.eduardominarelli.employmentcontractmanager.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private DataAccessService dataAccessService;

    @Override
    public List<Employee> retrieveAll() throws IOException {
        return dataAccessService.retrieveAll(Employee.class);
    }

    @Override
    public Employee save(Employee employee) throws IOException {
        return dataAccessService.save(employee);
    }

    @Override
    public void saveFromDTO(EmployeeDTO employeeDTO) throws IOException {
        Employee employee = this.save(employeeDTO.toEntity());
        storeUploadedFiles(employeeDTO, employee.getId().toString());
    }

    private void storeUploadedFiles(EmployeeDTO employeeDTO, String employeeId) {
        dataAccessService.uploadFiles(employeeDTO.getMultipartFiles(), employeeId);
    }
}
