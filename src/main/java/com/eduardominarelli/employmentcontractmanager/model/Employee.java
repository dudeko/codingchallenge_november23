package com.eduardominarelli.employmentcontractmanager.model;

import java.time.LocalDate;
import java.util.List;

public class Employee extends IdentifiableEntity {

    private String name;
    private LocalDate birthDate;
    private String cpfDocument;
    private String email;
    private String cellphoneNumber;
    private Address address;
    private List<EmployeeDocument> employeeDocumentList;

    public static Employee build() {
        return new Employee();
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

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<EmployeeDocument> getEmployeeDocumentList() {
        return employeeDocumentList;
    }

    public void setEmployeeDocumentList(List<EmployeeDocument> employeeDocumentList) {
        this.employeeDocumentList = employeeDocumentList;
    }

    @Override
    public Employee withId(Long id) {
        this.setId(id);
        return this;
    }

    public Employee withName(String name) {
        this.setName(name);
        return this;
    }

    public Employee withBirthDate(LocalDate birthDate) {
        this.setBirthDate(birthDate);
        return this;
    }

    public Employee withCpfDocument(String cpfDocument) {
        this.setCpfDocument(cpfDocument);
        return this;
    }

    public Employee withCellphoneNumber(String cellphoneNumber) {
        this.setCellphoneNumber(cellphoneNumber);
        return this;
    }

    public Employee withEmail(String email) {
        this.setEmail(email);
        return this;
    }

    public Employee withAddress(Address address) {
        this.setAddress(address);
        return this;
    }

    public Employee withDocuments(List<EmployeeDocument> employeeDocumentList) {
        this.setEmployeeDocumentList(employeeDocumentList);
        return this;
    }
}
