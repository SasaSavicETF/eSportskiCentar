package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Sport;
import tech.esc.esportskicentar.service.SportService;

import java.math.BigDecimal;
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

    @PutMapping()
    public ResponseEntity<Sport> updateSport(@Valid @RequestBody Sport sport) {
        Sport updatedSport = sportService.updateSport(sport);

        if (updatedSport != null)
            return new ResponseEntity<>(updatedSport, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSport(@PathVariable Integer id) {
        if (sportService.deleteSport(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        /*sportService.deleteSport(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);*/
    }

    @GetMapping("/{td}/{ts}/{tt}")
    public ResponseEntity<List<Sport>> getSportsByTeren(@PathVariable BigDecimal td, @PathVariable BigDecimal ts, @PathVariable Integer tt)
    {
        List<Sport> sports = sportService.findSportsByTeren(td, ts, tt);
        //sports.forEach(System.out::println);
        return new ResponseEntity<>(sports, HttpStatus.OK);
    }

}
