package com.eduardominarelli.employmentcontractmanager.dto;

import com.eduardominarelli.employmentcontractmanager.model.DocumentType;
import com.eduardominarelli.employmentcontractmanager.model.EmployeeDocument;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

public class EmployeeDocumentDTO {

    private String documentType;
    private MultipartFile file;

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public static List<EmployeeDocument> toEntityList(List<EmployeeDocumentDTO> employeeDocumentList) {
        if (employeeDocumentList == null) {
            return Collections.emptyList();
        }
        return employeeDocumentList.stream()
                                   .map(EmployeeDocumentDTO::toEntity)
                                   .toList();
    }

    private EmployeeDocument toEntity() {
        EmployeeDocument employeeDocument = new EmployeeDocument();
        employeeDocument.setDocumentType(DocumentType.valueOf(this.getDocumentType()));
        employeeDocument.setFilename(this.getFile().getOriginalFilename());
        return employeeDocument;
    }
}
