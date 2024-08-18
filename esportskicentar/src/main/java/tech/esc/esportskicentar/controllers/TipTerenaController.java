package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.TipTerena;
import tech.esc.esportskicentar.service.TipTerenaService;

import java.util.List;

@RestController
@RequestMapping("/tipTerena")
public class TipTerenaController {

    private final TipTerenaService tipTerenaService;

    public TipTerenaController(TipTerenaService tipTerenaService) {
        this.tipTerenaService = tipTerenaService;
    }

    @GetMapping
    public ResponseEntity<List<TipTerena>> getAllTipTerena() {
        List<TipTerena> tipTerenas = tipTerenaService.getAllTipTerena();
        return new ResponseEntity<>(tipTerenas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipTerena> getTipTerenaById(@PathVariable Integer id) {
        TipTerena tipTerena = tipTerenaService.getTipTerenaById(id);
        if (tipTerena != null)
            return new ResponseEntity<>(tipTerena, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<TipTerena> createUlaz(@Valid @RequestBody TipTerena tipTerena) {
        TipTerena newTipTerena = tipTerenaService.createTipTerena(tipTerena);
        return new ResponseEntity<>(newTipTerena, HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<TipTerena> updateTipTerena(@Valid @RequestBody TipTerena tipTerena) {
        TipTerena updatedTipTerena = tipTerenaService.updateTipTerena(tipTerena);

        if (updatedTipTerena != null)
            return new ResponseEntity<>(updatedTipTerena, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTipTerena(@PathVariable Integer id) {
        if (tipTerenaService.deleteTipTerena(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
