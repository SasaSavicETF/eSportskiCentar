package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Teren;
import tech.esc.esportskicentar.service.TerenService;

import java.util.List;

@RestController
@RequestMapping("/teren")
public class TerenController {

    private final TerenService terenService;

    @Autowired
    public TerenController(TerenService terenService) {
        this.terenService = terenService;
    }

    @GetMapping
    public ResponseEntity<List<Teren>> getAllUlaz() {
        List<Teren> terens = terenService.getAllTerens();
        return new ResponseEntity<>(terens, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teren> getTerenById(@PathVariable Integer id) {
        Teren teren = terenService.getTerenById(id);
        if (teren != null)
            return new ResponseEntity<>(teren, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Teren> createTeren(@Valid  @RequestBody Teren teren) {
        Teren newTeren = terenService.createTeren(teren);
        return new ResponseEntity<>(newTeren, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teren> updateTeren(@PathVariable Integer id, @Valid @RequestBody Teren teren) {
        Teren updatedTeren = terenService.updateTeren(teren, id);

        if (updatedTeren != null)
            return new ResponseEntity<>(updatedTeren, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeren(@PathVariable Integer id) {
        if (terenService.deleteTeren(id))
            return new ResponseEntity<>("Teren by id: " + id + " deleted successfully!", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>("Teren by id: " + id + " not found!", HttpStatus.NOT_FOUND);
    }

}
