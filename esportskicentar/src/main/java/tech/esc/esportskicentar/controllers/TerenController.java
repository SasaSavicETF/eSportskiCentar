package tech.esc.esportskicentar.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tech.esc.esportskicentar.model.Teren;
import tech.esc.esportskicentar.service.TerenService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/teren")
public class TerenController {

    private final TerenService terenService;

    @Autowired
    public TerenController(TerenService terenService) {
        this.terenService = terenService;
    }

    @GetMapping
    public ResponseEntity<List<Teren>> getAllUlaz() {
        List<Teren> terens = terenService.getAllTerens();
        return new ResponseEntity<>(terens, HttpStatus.OK);
    }

    @GetMapping("/dostupan/{idD}")
    public ResponseEntity<List<Teren>> getTerensByDostupanAndDvorana(@PathVariable Integer idD)
    {
        List<Teren> terens = terenService.getTerensByDostupan(idD);
        return new ResponseEntity<>(terens, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teren> getTerenById(@PathVariable Integer id) {
        Teren teren = terenService.getTerenById(id);
        if (teren != null)
            return new ResponseEntity<>(teren, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<?> createTeren(@RequestParam("teren") String terenJson,
                                         @RequestPart("image") MultipartFile file) throws IOException {
        Teren newTeren = terenService.createTeren(terenJson, file);
        System.out.println(newTeren);
        return new ResponseEntity<>(newTeren, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<Teren> updateTeren(@Valid @RequestBody Teren teren) {
        Teren updatedTeren = terenService.updateTeren(teren);

        if (updatedTeren != null)
            return new ResponseEntity<>(updatedTeren, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTeren(@PathVariable Integer id) {
        if (terenService.deleteTeren(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
