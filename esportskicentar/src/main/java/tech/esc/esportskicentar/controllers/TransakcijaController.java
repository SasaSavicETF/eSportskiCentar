package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.PrihodiRashodiStatsDTO;
import tech.esc.esportskicentar.model.TipTerena;
import tech.esc.esportskicentar.model.Transakcija;
import tech.esc.esportskicentar.service.TransakcijaService;

import java.util.List;

/**
 * @author milan
 * @created 11/13/2024 11:41 AM
 * @project esportskicentar
 */

@RestController
@RequestMapping("/transakcija")
public class TransakcijaController
{
    private final TransakcijaService transakcijaService;

    public TransakcijaController(TransakcijaService transakcijaService)
    {
        this.transakcijaService = transakcijaService;
    }

    @GetMapping
    public ResponseEntity<List<Transakcija>> getAllTransakcijas()
    {
        List<Transakcija> transakcijas = transakcijaService.getAllTransakcijas();
        return new ResponseEntity<>(transakcijas, HttpStatus.OK);
    }

    @GetMapping("/financialoverview")
    public ResponseEntity<PrihodiRashodiStatsDTO> getFinancialOverview() {
        PrihodiRashodiStatsDTO prihodiRashodiStatsDTO = transakcijaService.getFinancialOverview();
        return new ResponseEntity<>(prihodiRashodiStatsDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transakcija> getTransakcijaById(@PathVariable Integer id)
    {
        Transakcija transakcija = transakcijaService.getTransakcijaById(id);
        if(transakcija != null)
            return new ResponseEntity<>(transakcija, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }
    @PostMapping
    public ResponseEntity<Transakcija> createTransakcija(@Valid @RequestBody Transakcija transakcija) {
        Transakcija newTransakcija = transakcijaService.createTransakcija(transakcija);
        return new ResponseEntity<>(newTransakcija, HttpStatus.CREATED);
    }


    @PutMapping()
    public ResponseEntity<Transakcija> updateTransakcija(@Valid @RequestBody Transakcija transakcija) {
        Transakcija updatedTransakcija = transakcijaService.updateTransakcija(transakcija);

        if (updatedTransakcija != null)
            return new ResponseEntity<>(updatedTransakcija, HttpStatus.OK);
        else
            return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransakcija(@PathVariable Integer id) {
        if (transakcijaService.deleteTransakcija(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
