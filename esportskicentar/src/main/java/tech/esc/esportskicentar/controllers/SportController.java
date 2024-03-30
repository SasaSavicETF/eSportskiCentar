package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Sport;
import tech.esc.esportskicentar.service.SportService;

import java.util.List;

@RestController
@RequestMapping("/sport")
public class SportController {
    private final SportService sportService;
    @Autowired
    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @GetMapping
    public ResponseEntity<List<Sport>> getAllSports() {
        List<Sport> sports = sportService.getAllSports();
        return new ResponseEntity<>(sports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sport> getSportById(@PathVariable Integer id) {
        Sport sport = sportService.getSportById(id);
        if (sport != null)
            return new ResponseEntity<>(sport, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Sport> createSport(@Valid  @RequestBody Sport sport) {
        Sport newSport = sportService.createSport(sport);
        return new ResponseEntity<>(newSport, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sport> updateSport(@PathVariable Integer id, @Valid @RequestBody Sport sport) {
        Sport updatedSport = sportService.updateSport(sport,id);

        if (updatedSport != null)
            return new ResponseEntity<>(updatedSport, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSport(@PathVariable Integer id) {
        if (sportService.deleteSport(id))
            return new ResponseEntity<>("Sport by id: " + id + " deleted successfully!", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>("Sport by id: " + id + " not found!", HttpStatus.NOT_FOUND);
    }

}
