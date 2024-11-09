package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Ekipa;
import tech.esc.esportskicentar.service.EkipaService;

import java.util.List;

@RestController
@RequestMapping("/ekipa")
public class EkipaController {
    private final EkipaService ekipaService;
    @Autowired
    public EkipaController(EkipaService ekipaService) {
        this.ekipaService = ekipaService;
    }

    @GetMapping
    public ResponseEntity<List<Ekipa>> getAllEkipe() {
        List<Ekipa> ekipe = ekipaService.getAllEkipe();
        return new ResponseEntity<>(ekipe, HttpStatus.OK);
    }

    @GetMapping("/sport/{idS}")
    public ResponseEntity<List<Ekipa>> getEkipaBySport(@PathVariable Integer idS)
    {
        List<Ekipa> ekipas = ekipaService.findEkipasBySport(idS);
        return new ResponseEntity<>(ekipas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ekipa> getEkipaById(@PathVariable Integer id) {
        Ekipa ekipa = ekipaService.getEkipaById(id);
        if (ekipa != null)
            return new ResponseEntity<>(ekipa, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Ekipa> createEkipa(@Valid @RequestBody Ekipa ekipa) {
        Ekipa newEkipa = ekipaService.createEkipa(ekipa);
        return new ResponseEntity<>(newEkipa, HttpStatus.CREATED);
    }

    @PutMapping()
    public ResponseEntity<Ekipa> updateEkipa(@Valid @RequestBody Ekipa ekipa) {
        Ekipa updatedEkipa = ekipaService.updateEkipa(ekipa);

        if (updatedEkipa != null)
            return new ResponseEntity<>(updatedEkipa, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEkipa(@PathVariable Integer id) {
        if (ekipaService.deleteEkipa(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
