package com.sea.backend.controller;

import com.sea.backend.dto.ClientDto;
import com.sea.backend.model.Client;
import com.sea.backend.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = {"http://localhost:8081"})
@RequiredArgsConstructor
public class ClientController {

    private final ClientService service;



    @PostMapping
    public ResponseEntity<?> create(@RequestBody Client client) {
        try {
            Client saved = service.save(client);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Client client) {
        try {
            Client updated = service.update(id, client);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public List<ClientDto> getAllClients() {
        return service.findAll().stream()
                .map(ClientDto::new)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(client -> ResponseEntity.ok(new ClientDto(client)))
                .orElse(ResponseEntity.notFound().build());
    }


}
