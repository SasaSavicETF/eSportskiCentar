package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.service.KlijentService;

import java.util.List;

@RestController
@RequestMapping("/klijent")
public class KlijentController {
    private final KlijentService klijentService;

    @Autowired
    public KlijentController(KlijentService klijentService) {
        this.klijentService = klijentService;
    }

    @GetMapping
    public ResponseEntity<List<Klijent>> getAllKlijents() {
        List<Klijent> klijents = klijentService.getAllKlijents();
        return new ResponseEntity<>(klijents, HttpStatus.OK);
    }

    @GetMapping("/statistic/total")
    public ResponseEntity<Integer> getNumberOfKlijents() {
        int numberOfKlijents = klijentService.getNumberOfKlijents();
        return new ResponseEntity<>( numberOfKlijents, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Klijent> getKlijentById(@PathVariable Integer id) {
        Klijent klijent = klijentService.getKlijentById(id);
        if (klijent != null)
            return new ResponseEntity<>(klijent, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerKlijent(@Valid @RequestBody Klijent klijent) {
        klijentService.registerKlijent(klijent);
        return ResponseEntity.ok().body(HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<KlijentService.UserDTO> loginKlijent(@Valid @RequestBody KlijentService.LoginRequest loginRequest) {
        KlijentService.UserDTO userDTO = klijentService.loginKlijent(loginRequest);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Klijent> updateKlijent(@PathVariable Integer id, @Valid @RequestBody Klijent klijent) {
        Klijent updatedKlijent = klijentService.updateKlijent(klijent,id);

        if (updatedKlijent != null)
            return new ResponseEntity<>(updatedKlijent, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteKlijent(@PathVariable Integer id) {
        if (klijentService.deleteKlijent(id))
            return new ResponseEntity<>("Klijent by id: " + id + " deleted successfully!", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>("Klijent by id: " + id + " not found!", HttpStatus.NOT_FOUND);
    }

}
