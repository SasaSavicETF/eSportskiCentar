package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Administrator;
import tech.esc.esportskicentar.service.AdministratorService;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {

    private final AdministratorService administratorService;

    public AdministratorController(AdministratorService administratorService){
        this.administratorService = administratorService;
    }

    @GetMapping
    public ResponseEntity<List<Administrator>> getAllAdministrators()
    {
        List<Administrator> administrators = administratorService.findAllAdministrators();
        return new ResponseEntity<>(administrators, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Administrator> getAdministratorById(@PathVariable("id") Integer id)
    {
        Administrator administrator = administratorService.findAdministratorById(id);
        if(administrator == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(administrator, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Administrator> addAdministrator(@Valid @RequestBody Administrator administrator)
    {
        Administrator newAdministrator = administratorService.addAdministrator(administrator);
        return new ResponseEntity<>(newAdministrator, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Administrator> updateAdministrator(@PathVariable Integer id, @Valid @RequestBody Administrator administrator)
    {
        Administrator updateAdministrator = administratorService.updateAdministrator(id, administrator);
        if(updateAdministrator == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateAdministrator, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAdministrator(@PathVariable("id") Integer id)
    {
        administratorService.deleteAdministrator(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
