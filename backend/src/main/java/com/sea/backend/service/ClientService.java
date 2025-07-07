package com.sea.backend.service;

import com.sea.backend.dto.ViaCepResponse;
import com.sea.backend.model.Client;
import com.sea.backend.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository repository;
    private final RestTemplate restTemplate = new RestTemplate();

    public List<Client> findAll() {
        return repository.findAll();
    }

    public Optional<Client> findById(Long id) {
        return repository.findById(id);
    }

    public Client save(Client client) {

        if (repository.existsByCpf(client.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }


        String cep = client.getPostalCode().replaceAll("\\D", "");

        // Consulta ViaCEP
        ViaCepResponse viaCep = consultarViaCep(cep);


        client.setStreet(viaCep.getStreet());
        client.setNeighborhood(viaCep.getNeighborhood());
        client.setCity(viaCep.getLocalidade());
        client.setState(viaCep.getUf());
        client.setComplement(viaCep.getComplemento());

        return repository.save(client);
    }

    public Client update(Long id, Client updatedClient) {
        Client client = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        client.setName(updatedClient.getName());
        client.setCpf(updatedClient.getCpf());
        client.setPostalCode(updatedClient.getPostalCode());
        client.setStreet(updatedClient.getStreet());
        client.setNeighborhood(updatedClient.getNeighborhood());
        client.setCity(updatedClient.getCity());
        client.setState(updatedClient.getState());
        client.setComplement(updatedClient.getComplement());
        client.setPhones(updatedClient.getPhones());
        client.setEmails(updatedClient.getEmails());

        return repository.save(client);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private ViaCepResponse consultarViaCep(String cep) {
        String url = UriComponentsBuilder
                .fromUriString("https://viacep.com.br/ws/{cep}/json/")
                .buildAndExpand(cep)
                .toUriString();

        ViaCepResponse response = restTemplate.getForObject(url, ViaCepResponse.class);

        if (response == null || response.isErro()) {
            throw new RuntimeException("CEP inválido ou não encontrado");
        }

        return response;
    }
}
