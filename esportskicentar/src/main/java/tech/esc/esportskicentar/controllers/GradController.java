package tech.esc.esportskicentar.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Grad;
import tech.esc.esportskicentar.service.GradService;

import java.util.List;

@RestController
@RequestMapping("/grad")
public class GradController
{
    private final GradService gradService;

    public GradController(GradService gradService) {
        this.gradService = gradService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Grad>> getAllGrads()
    {
        List<Grad> grads = gradService.findAllGrads();
        return new ResponseEntity<>(grads, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Grad> getGradById (@PathVariable("id") Integer id)
    {
        Grad grad = gradService.findGradById(id);
        return new ResponseEntity<>(grad, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Grad> addGrad(@Valid  @RequestBody Grad grad)
    {
        Grad newGrad = gradService.addGrad(grad);
        return new ResponseEntity<>(newGrad, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Grad> updateGrad(@PathVariable Integer id, @Valid @RequestBody Grad grad)
    {
        Grad updateGrad = gradService.updateGrad(id, grad);
        return new ResponseEntity<>(updateGrad, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGrad(@PathVariable("id") Integer id)
    {
        gradService.deleteGrad(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
