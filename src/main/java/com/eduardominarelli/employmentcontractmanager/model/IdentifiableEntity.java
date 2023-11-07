package com.eduardominarelli.employmentcontractmanager.model;

public abstract class IdentifiableEntity {

    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public abstract IdentifiableEntity withId(Long id);
}
