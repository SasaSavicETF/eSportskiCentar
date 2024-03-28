package tech.esc.esportskicentar.controllers;
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
        return new ResponseEntity<>(zadatak, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Zadatak> addZadatak(@RequestBody Zadatak zadatak)
    {
        Zadatak newZadatak = zadatakService.addZadatak(zadatak);
        return new ResponseEntity<>(newZadatak, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zadatak> updateZadatak(@RequestBody Zadatak zadatak)
    {
        Zadatak updateZadatak = zadatakService.updateZadatak(zadatak);
        return new ResponseEntity<>(updateZadatak, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteZadatak(@PathVariable("id") Integer id)
    {
        zadatakService.deleteZadatak(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
