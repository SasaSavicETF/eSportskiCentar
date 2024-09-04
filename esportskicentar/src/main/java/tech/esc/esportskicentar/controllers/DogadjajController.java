package tech.esc.esportskicentar.controllers;
import jakarta.validation.Valid;
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

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Dogadjaj>> getAllDogadjajs(@PathVariable("id") Integer id)
    {
        List<Dogadjaj> dogadjajs = dogadjajService.findAllDogadjajsOfUser(id);
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dogadjaj> getDogadjajById(@PathVariable("id") Integer id)
    {
        Dogadjaj dogadjaj = dogadjajService.findDogadjajById(id);
        if(dogadjaj == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(dogadjaj, HttpStatus.OK);
    }

    /*
    @PostMapping("/add")
    public ResponseEntity<Dogadjaj> addDogadjaj(@Valid @RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj newDogadjaj = dogadjajService.addDogadjaj(dogadjaj);
        return new ResponseEntity<>(newDogadjaj, HttpStatus.CREATED);
    }
     */

    @PostMapping("/add")
    public ResponseEntity<Dogadjaj> addDogadjaj(@Valid @RequestBody Dogadjaj dogadjaj) {
        try {
            Dogadjaj newDogadjaj = dogadjajService.addDogadjaj(dogadjaj);
            return new ResponseEntity<>(newDogadjaj, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Hvatanje IllegalArgumentException i vraćanje odgovarajuće HTTP greške
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        } catch (Exception e) {
            // Hvatanje generalnih izuzetaka i vraćanje internih grešaka servera
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<Dogadjaj> updateDogadjaj( @Valid @RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj updateDogadjaj = dogadjajService.updateDogadjaj(dogadjaj);
        if(updateDogadjaj == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateDogadjaj, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDogadjaj(@PathVariable("id") Integer id)
    {
        if(dogadjajService.deleteDogadjaj(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
