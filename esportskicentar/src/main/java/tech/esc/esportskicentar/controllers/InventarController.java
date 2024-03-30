package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Inventar;
import tech.esc.esportskicentar.service.InventarService;

import java.util.List;

@RestController
@RequestMapping("/inventar")
public class InventarController {

    private final InventarService inventarService;


    public InventarController(InventarService inventarService) {
        this.inventarService = inventarService;
    }

    @GetMapping
    public ResponseEntity<List<Inventar>> getAllInventars() {
        List<Inventar> inventars = inventarService.getAllInventars();
        return new ResponseEntity<>(inventars, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventar> getInventarById(@PathVariable Integer id) {
        Inventar inventar = inventarService.getInventarById(id);
        if (inventar != null)
            return new ResponseEntity<>(inventar, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Inventar> createInventar(@Valid  @RequestBody Inventar inventar) {
        Inventar newInventar = inventarService.createInventar(inventar);
        return new ResponseEntity<>(newInventar, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventar> updateInventar(@PathVariable Integer id, @Valid @RequestBody Inventar inventar) {
        Inventar updatedInventar = inventarService.updateInventar(inventar,id);

        if (updatedInventar != null)
            return new ResponseEntity<>(updatedInventar, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInventar(@PathVariable Integer id) {
        if (inventarService.deleteInventar(id))
            return new ResponseEntity<>("Inventar by id: " + id + " deleted successfully!", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>("Inventar by id: " + id + " not found!", HttpStatus.NOT_FOUND);
    }

}
