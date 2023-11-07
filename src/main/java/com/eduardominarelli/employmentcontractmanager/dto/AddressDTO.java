package com.eduardominarelli.employmentcontractmanager.dto;

import com.eduardominarelli.employmentcontractmanager.model.Address;

public class AddressDTO {

    private String street;
    private String number;
    private String city;
    private String state;

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Address toEntity() {
        Address address = new Address();
        address.setStreet(this.getStreet());
        address.setNumber(this.getNumber());
        address.setCity(this.getCity());
        address.setState(this.getState());
        return address;
    }
}
