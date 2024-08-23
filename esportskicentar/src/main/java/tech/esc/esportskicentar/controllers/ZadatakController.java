package tech.esc.esportskicentar.controllers;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Zadatak;
import tech.esc.esportskicentar.service.ZadatakService;

import java.util.List;

@RestController
@RequestMapping("/zadatak")
public class ZadatakController {

    private final ZadatakService zadatakService;

    public ZadatakController(ZadatakService zadatakService){
        this.zadatakService = zadatakService;
    }

    @GetMapping
    public ResponseEntity<List<Zadatak>> getAllZadataks()
    {
        List<Zadatak> zadataks = zadatakService.findAllZadataks();
        return new ResponseEntity<>(zadataks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zadatak> getZadatakById(@PathVariable("id") Integer id)
    {
        Zadatak zadatak = zadatakService.findZadatakById(id);
        if(zadatak == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(zadatak, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Zadatak> addZadatak(@Valid @RequestBody Zadatak zadatak)
    {
        Zadatak newZadatak = zadatakService.addZadatak(zadatak);
        return new ResponseEntity<>(newZadatak, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Zadatak> updateZadatak(@Valid @RequestBody Zadatak zadatak)
    {
        Zadatak updateZadatak = zadatakService.updateZadatak(zadatak);
        if(updateZadatak == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateZadatak, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteZadatak(@PathVariable("id") Integer id)
    {
        if(zadatakService.deleteZadatak(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
