package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Ulaz;
import tech.esc.esportskicentar.service.UlazService;

import java.util.List;

@RestController
@RequestMapping("/ulaz")
public class UlazController {

    private final UlazService ulazService;

    @Autowired
    public UlazController(UlazService ulazService) {
        this.ulazService = ulazService;
    }

    @GetMapping
    public ResponseEntity<List<Ulaz>> getAllUlaz() {
        List<Ulaz> ulazi = ulazService.getAllUlaz();
        return new ResponseEntity<>(ulazi, HttpStatus.OK);
    }

    @GetMapping("/dvorana/{idD}")
    public ResponseEntity<List<Ulaz>> getUlazsByDvorana(@PathVariable Integer idD)
    {
        List<Ulaz> ulazs = ulazService.findUlazsByDvorana(idD);
        //ulazs.forEach(System.out::println);
        return new ResponseEntity<>(ulazs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ulaz> getUlazById(@PathVariable Integer id) {
        Ulaz ulaz = ulazService.getUlazById(id);
        if (ulaz != null)
            return new ResponseEntity<>(ulaz, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Ulaz> createUlaz(@Valid @RequestBody Ulaz ulaz) {
        Ulaz newUlaz = ulazService.createUlaz(ulaz);
        return new ResponseEntity<>(newUlaz, HttpStatus.CREATED);
        //return ResponseEntity.status(HttpStatus.CREATED).body(newUlaz);
    }

    @PutMapping()
    public ResponseEntity<Ulaz> updateUlaz(@Valid @RequestBody Ulaz oldUlaz) {
        Ulaz updatedUlaz = ulazService.updateUlaz(oldUlaz);

        if (updatedUlaz != null)
            return new ResponseEntity<>(updatedUlaz, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUlaz(@PathVariable Integer id) {
        if (ulazService.deleteUlaz(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
