package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Upravnik;
import tech.esc.esportskicentar.service.UpravnikService;

import java.util.List;

@RestController
@RequestMapping("/upravnik")
public class UpravnikController {

    private final UpravnikService upravnikService;

    public UpravnikController(UpravnikService upravnikService){
        this.upravnikService = upravnikService;
    }

    @GetMapping
    public ResponseEntity<List<Upravnik>> getAllUpravniks()
    {
        List<Upravnik> upravniks = upravnikService.findAllUpravniks();
        return new ResponseEntity<>(upravniks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Upravnik> getUpravnikById(@PathVariable("id") Integer id)
    {
        Upravnik upravnik = upravnikService.findUpravnikById(id);
        if(upravnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(upravnik, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Upravnik> addUpravnik(@Valid @RequestBody Upravnik upravnik)
    {
        Upravnik newUpravnik = upravnikService.addUpravnik(upravnik);
        return new ResponseEntity<>(newUpravnik, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Upravnik> updateUpravnik(@PathVariable Integer id, @Valid @RequestBody Upravnik upravnik)
    {
        Upravnik updateUpravnik = upravnikService.updateUpravnik(id, upravnik);
        if(updateUpravnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateUpravnik, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUpravnik(@PathVariable("id") Integer id)
    {
        upravnikService.deleteUpravnik(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
