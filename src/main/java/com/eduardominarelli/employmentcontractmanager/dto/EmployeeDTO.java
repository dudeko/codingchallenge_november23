package com.eduardominarelli.employmentcontractmanager.dto;

import com.eduardominarelli.employmentcontractmanager.model.Employee;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

import static java.util.List.of;

public class EmployeeDTO {

    private Long id;
    private String name;
    private LocalDate birthDate;
    private String cpfDocument;
    private String email;
    private String cellphoneNumber;
    private AddressDTO address;
    private List<EmployeeDocumentDTO> employeeDocumentList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getCpfDocument() {
        return cpfDocument;
    }

    public void setCpfDocument(String cpfDocument) {
        this.cpfDocument = cpfDocument;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellphoneNumber() {
        return cellphoneNumber;
    }

    public void setCellphoneNumber(String cellphoneNumber) {
        this.cellphoneNumber = cellphoneNumber;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public List<EmployeeDocumentDTO> getEmployeeDocumentList() {
        return employeeDocumentList;
    }

    public void setEmployeeDocumentList(List<EmployeeDocumentDTO> employeeDocumentList) {
        this.employeeDocumentList = employeeDocumentList;
    }

    @JsonIgnore
    public List<MultipartFile> getMultipartFiles() {
        if (this.getEmployeeDocumentList() == null) {
            return of();
        }
        return this.getEmployeeDocumentList().stream()
                .filter(EmployeeDocumentDTO::hasFile)
                .map(EmployeeDocumentDTO::getFile)
                .toList();
    }

    public Employee toEntity() {
        return Employee.build()
                .withId(this.getId())
                .withName(this.getName())
                .withBirthDate(this.getBirthDate())
                .withCpfDocument(this.getCpfDocument())
                .withEmail(this.getEmail())
                .withCellphoneNumber(this.getCellphoneNumber())
                .withAddress(this.getAddress() != null ? this.getAddress().toEntity() : null)
                .withDocuments(EmployeeDocumentDTO.toEntityList(this.getEmployeeDocumentList()));
    }

    public boolean isNameContained(Employee employee) {
        return employee.getName().toLowerCase().contains(this.getName().toLowerCase());
    }

    public boolean isCityContained(Employee employee) {
        return employee.getAddress().getCity().toLowerCase().contains(this.getAddress().getCity().toLowerCase());
    }

    public boolean isStateContained(Employee employee) {
        return employee.getAddress().getState().toLowerCase().contains(this.getAddress().getState().toLowerCase());
    }
}
