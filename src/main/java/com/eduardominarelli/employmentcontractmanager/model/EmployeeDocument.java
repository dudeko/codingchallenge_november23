package com.eduardominarelli.employmentcontractmanager.model;

public class EmployeeDocument {

    private DocumentType documentType;
    private String filename;

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
