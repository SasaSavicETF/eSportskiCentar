package tech.esc.esportskicentar.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.service.DogadjajService;

import java.util.List;

@RestController
@RequestMapping("/dogadjaj")
public class DogadjajController {

    private final DogadjajService dogadjajService;

    public DogadjajController(DogadjajService dogadjajService){
        this.dogadjajService = dogadjajService;
    }

    @GetMapping
    public ResponseEntity<List<Dogadjaj>> getAllDogadjajs()
    {
        List<Dogadjaj> dogadjajs = dogadjajService.findAllDogadjajs();
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dogadjaj> getDogadjajById(@PathVariable("id") Integer id)
    {
        Dogadjaj dogadjaj = dogadjajService.findDogadjajById(id);
        return new ResponseEntity<>(dogadjaj, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Dogadjaj> addDogadjaj(@RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj newDogadjaj = dogadjajService.addDogadjaj(dogadjaj);
        return new ResponseEntity<>(newDogadjaj, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dogadjaj> updateDogadjaj(@RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj updateDogadjaj = dogadjajService.updateDogadjaj(dogadjaj);
        return new ResponseEntity<>(updateDogadjaj, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDogadjaj(@PathVariable("id") Integer id)
    {
        dogadjajService.deleteDogadjaj(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
