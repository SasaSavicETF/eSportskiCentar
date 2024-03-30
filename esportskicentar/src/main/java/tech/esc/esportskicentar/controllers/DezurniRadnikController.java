package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.DezurniRadnik;
import tech.esc.esportskicentar.service.DezurniRadnikService;

import java.util.List;

@RestController
@RequestMapping("/dezurniRadnik")
public class DezurniRadnikController {

    private final DezurniRadnikService dezurniRadnikService;

    public DezurniRadnikController(DezurniRadnikService dezurniRadnikService){
        this.dezurniRadnikService = dezurniRadnikService;
    }

    @GetMapping
    public ResponseEntity<List<DezurniRadnik>> getAllDezurniRadniks()
    {
        List<DezurniRadnik> dezurniRadniks = dezurniRadnikService.findAllDezurniRadniks();
        return new ResponseEntity<>(dezurniRadniks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DezurniRadnik> getDezurniRadnikById(@PathVariable("id") Integer id)
    {
        DezurniRadnik dezurniRadnik = dezurniRadnikService.findDezurniRadnikById(id);
        if(dezurniRadnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(dezurniRadnik, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DezurniRadnik> addDezurniRadnik(@Valid @RequestBody DezurniRadnik dezurniRadnik)
    {
        DezurniRadnik newDezurniRadnik = dezurniRadnikService.addDezurniRadnik(dezurniRadnik);
        return new ResponseEntity<>(newDezurniRadnik, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DezurniRadnik> updateDezurniRadnik(@PathVariable Integer id, @Valid @RequestBody DezurniRadnik dezurniRadnik)
    {
        DezurniRadnik updateDezurniRadnik = dezurniRadnikService.updateDezurniRadnik(id, dezurniRadnik);
        if(updateDezurniRadnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateDezurniRadnik, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDezurniRadnik(@PathVariable("id") Integer id)
    {
        dezurniRadnikService.deleteDezurniRadnik(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
