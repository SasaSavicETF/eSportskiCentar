package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Zahtjev;
import tech.esc.esportskicentar.service.ZahtjevService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/zahtjev")
public class ZahtjevController {
    private final ZahtjevService zahtjevService;
    @Autowired
    public ZahtjevController(ZahtjevService zahtjevService) {
        this.zahtjevService = zahtjevService;
    }

    @GetMapping
    public ResponseEntity<List<Zahtjev>> getAllZahtjevs() {
        List<Zahtjev> zahtjevs = zahtjevService.getAllZahtjevs();
        return new ResponseEntity<>(zahtjevs, HttpStatus.OK);
    }

    @GetMapping("/statistic/total")
    public ResponseEntity<Integer> getNumberOfZahtjevs() {
        int numberOfZahtjevs = zahtjevService.getNumberOfZahtjevs();
        return new ResponseEntity<>( numberOfZahtjevs, HttpStatus.OK);
    }

    @GetMapping("/statistic/reservation")
    public ResponseEntity<Map<String,Integer>> getZahtjevsStats() {
        Map<String,Integer> zahtjevsStats = zahtjevService.getZahtjevStats();
        return new ResponseEntity<>( zahtjevsStats, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zahtjev> getZahtjevById(@PathVariable Integer id) {
        Zahtjev zahtjev = zahtjevService.getZahtjevById(id);
        if (zahtjev != null)
            return new ResponseEntity<>(zahtjev, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Zahtjev> createZahtjev(@Valid @RequestBody Zahtjev zahtjev) {
        Zahtjev newZahtjev = zahtjevService.createZahtjev(zahtjev);
        return new ResponseEntity<>(newZahtjev, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zahtjev> updateZahtjev(@PathVariable Integer id, @Valid @RequestBody Zahtjev zahtjev) {
        Zahtjev updatedZahtjev = zahtjevService.updateZahtjev(zahtjev, id);

        if (updatedZahtjev != null)
            return new ResponseEntity<>(updatedZahtjev, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteZahtjev(@PathVariable Integer id) {
        if (zahtjevService.deleteZahtjev(id))
            return new ResponseEntity<>("Zahtjev by id: " + id + " deleted successfully!", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>("Zahtjev by id: " + id + " not found!", HttpStatus.NOT_FOUND);
    }

}
