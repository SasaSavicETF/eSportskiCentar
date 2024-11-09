package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Svlacionica;
import tech.esc.esportskicentar.service.SvlacionicaService;

import java.util.List;

@RestController
@RequestMapping("/svlacionica")
public class SvlacionicaController {

    private final SvlacionicaService svlacionicaService;

    @Autowired
    public SvlacionicaController(SvlacionicaService svlacionicaService) {
        this.svlacionicaService = svlacionicaService;
    }

    @GetMapping
    public ResponseEntity<List<Svlacionica>> getAllSvlacionicas() {
        List<Svlacionica> svlacionicas = svlacionicaService.getAllSvlacionicas();
        return new ResponseEntity<>(svlacionicas, HttpStatus.OK);
    }

    @GetMapping("/dvorana/{idD}")
    public ResponseEntity<List<Svlacionica>> getSvlacionicasByDvorana(@PathVariable Integer idD)
    {
        List<Svlacionica> svlacionicas = svlacionicaService.findSvlacionicasByDvorana(idD);
        return new ResponseEntity<>(svlacionicas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Svlacionica> getSvlacionicaById(@PathVariable Integer id) {
        Svlacionica svlacionica = svlacionicaService.getSvlacionicaById(id);
        if (svlacionica != null)
            return new ResponseEntity<>(svlacionica, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Svlacionica> createSvlacionica(@Valid @RequestBody Svlacionica svlacionica) {
        Svlacionica newSvlacionica = svlacionicaService.createSvlacionica(svlacionica);
        return new ResponseEntity<>(newSvlacionica, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Svlacionica> updateSvlacionica(@Valid @RequestBody Svlacionica svlacionica) {
        Svlacionica updatedSvlacionica = svlacionicaService.updateSvlacionica(svlacionica);

        if (updatedSvlacionica != null)
            return new ResponseEntity<>(updatedSvlacionica, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSvlacionica(@PathVariable Integer id) {
        if (svlacionicaService.deleteSvlacionica(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
