package tech.esc.esportskicentar.controllers;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Raspored;
import tech.esc.esportskicentar.service.RasporedService;

import java.util.List;

@RestController
@RequestMapping("/raspored")
public class RasporedController {

    private final RasporedService rasporedService;

    public RasporedController(RasporedService rasporedService){
        this.rasporedService = rasporedService;
    }

    @GetMapping
    public ResponseEntity<List<Raspored>> getAllRasporeds()
    {
        List<Raspored> rasporeds = rasporedService.findAllRasporeds();
        return new ResponseEntity<>(rasporeds, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Raspored> getRasporedById(@PathVariable("id") Integer id)
    {
        Raspored raspored = rasporedService.findRasporedById(id);
        if(raspored == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(raspored, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Raspored> addRaspored(@Valid @RequestBody Raspored raspored)
    {
        Raspored newRaspored = rasporedService.addRaspored(raspored);
        return new ResponseEntity<>(newRaspored, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Raspored> updateRaspored(@PathVariable Integer id, @Valid @RequestBody Raspored raspored)
    {
        Raspored updateRaspored = rasporedService.updateRaspored(id, raspored);
        if(updateRaspored == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateRaspored, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRaspored(@PathVariable("id") Integer id)
    {
        rasporedService.deleteRaspored(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
