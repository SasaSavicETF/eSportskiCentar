package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Takmicenje;
import tech.esc.esportskicentar.service.TakmicenjeService;

import java.util.List;

@RestController
@RequestMapping("/takmicenje")
public class TakmicenjeController {
    private final TakmicenjeService takmicenjeService;
    @Autowired
    public TakmicenjeController(TakmicenjeService takmicenjeService) {
        this.takmicenjeService = takmicenjeService;
    }

    @GetMapping
    public ResponseEntity<List<Takmicenje>> getAllTakmicenja() {
        List<Takmicenje> takmicenja = takmicenjeService.getAllTakmicenja();
        return new ResponseEntity<>(takmicenja, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Takmicenje> getTakmicenjeById(@PathVariable Integer id) {
        Takmicenje takmicenje = takmicenjeService.getTakmicenjeById(id);
        if (takmicenje != null)
            return new ResponseEntity<>(takmicenje, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Takmicenje> createTakmicenje(@Valid  @RequestBody Takmicenje takmicenje) {
        Takmicenje newTakmicenje = takmicenjeService.createTakmicenje(takmicenje);
        return new ResponseEntity<>(newTakmicenje, HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Takmicenje> updateTakmicenje(@Valid @RequestBody Takmicenje takmicenje) {
        Takmicenje updatedTakmicenje = takmicenjeService.updateTakmicenje(takmicenje);

        if (updatedTakmicenje != null)
            return new ResponseEntity<>(updatedTakmicenje, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTakmicenje(@PathVariable Integer id) {
        if (takmicenjeService.deleteTakmicenje(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
