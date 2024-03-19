package tech.esc.esportskicentar;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Dvorana;
import tech.esc.esportskicentar.service.DvoranaService;

import java.util.List;

@RestController
@RequestMapping("/dvorana")
public class DvoranaResource
{
    private final DvoranaService dvoranaService;

    public DvoranaResource(DvoranaService dvoranaService)
    {
        this.dvoranaService = dvoranaService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Dvorana>> getAllDvoranas()
    {
        List<Dvorana> dvoranas = dvoranaService.findAllDvoranas();
        return new ResponseEntity<>(dvoranas, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Dvorana> getDvoranaById(@PathVariable("id") Integer id)
    {
        Dvorana dvorana = dvoranaService.findDvoranaById(id);
        return new ResponseEntity<>(dvorana, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Dvorana> addDvorana(@RequestBody Dvorana dvorana)
    {
        Dvorana newDvorana = dvoranaService.addDvorana(dvorana);
        return new ResponseEntity<>(newDvorana, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Dvorana> updateDvorana(@RequestBody Dvorana dvorana)
    {
        Dvorana updateDvorana = dvoranaService.updateDvorana(dvorana);
        return new ResponseEntity<>(updateDvorana, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDvorana(@PathVariable("id") Integer id)
    {
        dvoranaService.deleteDvorana(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
