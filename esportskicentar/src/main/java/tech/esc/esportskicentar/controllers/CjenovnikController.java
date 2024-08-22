package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Cjenovnik;
import tech.esc.esportskicentar.service.CjenovnikService;

import java.util.List;

@RestController
@RequestMapping("/cjenovnik")
public class CjenovnikController {

    private final CjenovnikService cjenovnikService;

    public CjenovnikController(CjenovnikService cjenovnikService){
        this.cjenovnikService = cjenovnikService;
    }

    @GetMapping
    public ResponseEntity<List<Cjenovnik>> getAllCjenovniks()
    {
        List<Cjenovnik> cjenovniks = cjenovnikService.findAllCjenovniks();
        return new ResponseEntity<>(cjenovniks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cjenovnik> getCjenovnikById(@PathVariable("id") Integer id)
    {
        Cjenovnik cjenovnik = cjenovnikService.findCjenovnikById(id);
        if(cjenovnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(cjenovnik, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Cjenovnik> addCjenovnik(@Valid @RequestBody Cjenovnik cjenovnik)
    {
        Cjenovnik newCjenovnik = cjenovnikService.addCjenovnik(cjenovnik);
        return new ResponseEntity<>(newCjenovnik, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Cjenovnik> updateCjenovnik(@Valid @RequestBody Cjenovnik cjenovnik)
    {
        Cjenovnik updateCjenovnik = cjenovnikService.updateCjenovnik(cjenovnik);
        if(updateCjenovnik == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateCjenovnik, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCjenovnik(@PathVariable("id") Integer id)
    {
        cjenovnikService.deleteCjenovnik(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
