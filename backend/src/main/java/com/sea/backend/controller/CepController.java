package com.sea.backend.controller;
import com.sea.backend.dto.ViaCepResponse;
import com.sea.backend.service.CepService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cep")
@CrossOrigin(origins = "http://localhost:8081")  // Ajuste conforme seu frontend
public class CepController {

    private final CepService cepService;

    public CepController(CepService cepService) {
        this.cepService = cepService;
    }

    @GetMapping("/{cep}")
    public ResponseEntity<?> consultaCep(@PathVariable String cep) {
        ViaCepResponse endereco = cepService.buscarEnderecoPorCep(cep);

        if (endereco == null || endereco.isErro()) {
            return ResponseEntity.badRequest().body("CEP inválido ou não encontrado");
        }
        return ResponseEntity.ok(endereco);
    }
}
