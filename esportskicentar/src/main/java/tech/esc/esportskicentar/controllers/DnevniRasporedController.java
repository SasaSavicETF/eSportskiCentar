package tech.esc.esportskicentar.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.DnevniRaspored;
import tech.esc.esportskicentar.service.DnevniRasporedService;

import java.util.List;

@RestController
@RequestMapping("/dnevniraspored")
public class DnevniRasporedController {

    private final DnevniRasporedService dnevniRasporedService;

    public DnevniRasporedController(DnevniRasporedService dnevniRasporedService){
        this.dnevniRasporedService = dnevniRasporedService;
    }

    @GetMapping
    public ResponseEntity<List<DnevniRaspored>> getAllDnevniRasporeds()
    {
        List<DnevniRaspored> dnevniRasporeds = dnevniRasporedService.findAllDnevniRasporeds();
        return new ResponseEntity<>(dnevniRasporeds, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DnevniRaspored> getDnevniRasporedById(@PathVariable("id") Integer id)
    {
        DnevniRaspored dnevniRaspored = dnevniRasporedService.findDnevniRasporedById(id);
        return new ResponseEntity<>(dnevniRaspored, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DnevniRaspored> addDnevniRaspored(@RequestBody DnevniRaspored dnevniRaspored)
    {
        DnevniRaspored newDnevniRaspored = dnevniRasporedService.addDnevniRaspored(dnevniRaspored);
        return new ResponseEntity<>(newDnevniRaspored, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DnevniRaspored> updateDnevniRaspored(@RequestBody DnevniRaspored dnevniRaspored)
    {
        DnevniRaspored updateDnevniRaspored = dnevniRasporedService.updateDnevniRaspored(dnevniRaspored);
        return new ResponseEntity<>(updateDnevniRaspored, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDnevniRaspored(@PathVariable("id") Integer id)
    {
        dnevniRasporedService.deleteDnevniRaspored(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
