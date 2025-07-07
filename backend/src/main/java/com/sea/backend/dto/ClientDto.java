package com.sea.backend.dto;

import com.sea.backend.model.Client;
import lombok.Data;

import java.util.List;

@Data
public class ClientDto {
    private Long id;
    private String name;
    private String cpf;
    private String postalCode;
    private String street;
    private String neighborhood;
    private String city;
    private String state;
    private String complement;
    private List<String> phones;
    private List<String> emails;

    public ClientDto(Client client) {
        this.id = client.getId();
        this.name = client.getName();
        this.cpf = formatCpf(client.getCpf());
        this.postalCode = client.getPostalCode();
        this.street = client.getStreet();
        this.neighborhood = client.getNeighborhood();
        this.city = client.getCity();
        this.state = client.getState();
        this.complement = client.getComplement();
        this.phones = client.getPhones();
        this.emails = client.getEmails();
    }

    private String formatCpf(String cpf) {
        if (cpf == null || cpf.length() != 11) return cpf;
        return cpf.replaceAll("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");
    }
}
