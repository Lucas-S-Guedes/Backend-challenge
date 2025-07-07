package com.sea.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ViaCepResponse {
    private String cep;

    @JsonProperty("logradouro")
    private String street;

    @JsonProperty("bairro")
    private String neighborhood;

    private String localidade;

    private String uf;

    private String complemento;

    private boolean erro;
}
