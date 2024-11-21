package tech.esc.esportskicentar.controllers;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.model.DogadjajDTO;
import tech.esc.esportskicentar.model.DogadjajStatsDTO;
import tech.esc.esportskicentar.service.DogadjajService;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dogadjaj")
public class DogadjajController {

    private final DogadjajService dogadjajService;

    public DogadjajController(DogadjajService dogadjajService){
        this.dogadjajService = dogadjajService;
    }

    @GetMapping
    public ResponseEntity<List<Dogadjaj>> getAllDogadjajs()
    {
        List<Dogadjaj> dogadjajs = dogadjajService.findAllDogadjajs();
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/filtered/{idDR}/{idT}")
    public ResponseEntity<List<Dogadjaj>> getAllFilteredDogadjajs(@PathVariable Integer idDR, @PathVariable Integer idT)
    {
        List<Dogadjaj> dogadjajs = dogadjajService.findAllFilteredDogadjajs(idDR, idT);
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/statistic/total")
    public ResponseEntity<Integer> getNumberOfDogadjajs() {
        int numberOfDogadjajs = dogadjajService.getNumberOfDogadjajs();
        return new ResponseEntity<>( numberOfDogadjajs, HttpStatus.OK);
    }

    @GetMapping("/statistic/reservation/total")
    public ResponseEntity<Integer> getNumberOfZahtjevs() {
        int numberOfReservations = dogadjajService.getNumberOfReservations();
        return new ResponseEntity<>( numberOfReservations, HttpStatus.OK);
    }

    @GetMapping("/statistic/reservation")
    public ResponseEntity<Map<String,Integer>> getZahtjevsStats() {
        Map<String,Integer> reservationStats = dogadjajService.getReservationStats();
        return new ResponseEntity<>( reservationStats, HttpStatus.OK);
    }

    @GetMapping("/statistic/for/{period}")
    public ResponseEntity<List<DogadjajStatsDTO>> getAllDogadjajsForPeriod(@PathVariable("period") String period)
    {
        List<DogadjajStatsDTO> dogadjajs = dogadjajService.findAllDogadjajsForPeriod(period);
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Dogadjaj>> getAllDogadjajs(@PathVariable("id") Integer id)
    {
        List<Dogadjaj> dogadjajs = dogadjajService.findAllDogadjajsOfUser(id);
        return new ResponseEntity<>(dogadjajs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dogadjaj> getDogadjajById(@PathVariable("id") Integer id)
    {
        Dogadjaj dogadjaj = dogadjajService.findDogadjajById(id);
        if(dogadjaj == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(dogadjaj, HttpStatus.OK);
    }

    /*
    @PostMapping("/add")
    public ResponseEntity<Dogadjaj> addDogadjaj(@Valid @RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj newDogadjaj = dogadjajService.addDogadjaj(dogadjaj);
        return new ResponseEntity<>(newDogadjaj, HttpStatus.CREATED);
    }
     */

    @PostMapping("/add")
    public ResponseEntity<Dogadjaj> addDogadjaj(@Valid @RequestBody Dogadjaj dogadjaj) {
        try {
            Dogadjaj newDogadjaj = dogadjajService.addDogadjaj(dogadjaj);
            return new ResponseEntity<>(newDogadjaj, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            // Hvatanje IllegalArgumentException i vraćanje odgovarajuće HTTP greške
            return new ResponseEntity<>(null, HttpStatus.CONFLICT);
        } catch (Exception e) {
            // Hvatanje generalnih izuzetaka i vraćanje internih grešaka servera
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<Dogadjaj> updateDogadjaj( @Valid @RequestBody Dogadjaj dogadjaj)
    {
        Dogadjaj updateDogadjaj = dogadjajService.updateDogadjaj(dogadjaj);
        if(updateDogadjaj == null)
            return ResponseEntity.notFound().build();
        else
            return new ResponseEntity<>(updateDogadjaj, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDogadjaj(@PathVariable("id") Integer id)
    {
        if(dogadjajService.deleteDogadjaj(id))
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/sukob")
    public boolean vremenskiSukob(@Valid @RequestBody Dogadjaj dogadjaj)
    {
        boolean a = dogadjajService.vremenskiSukob(dogadjaj);
        System.out.println(a);
        return a;
    }

    @PostMapping()
    public ResponseEntity<List<DogadjajDTO>> getWeeklyEvents(@RequestBody WeeklyEventsRequest dataRequest) {
        List<DogadjajDTO> weeklyEvents = dogadjajService.findWeeklyEvents(dataRequest.idTeren(), dataRequest.dates());
        return new ResponseEntity<>(weeklyEvents, HttpStatus.OK);
    }

    private record WeeklyEventsRequest(
            @NotNull
            int idTeren,
            @NotBlank
            List<LocalDate> dates)
    {}

    @GetMapping("/paginated/{idD}")
    public Page<Dogadjaj> getNeodobreniDogadjajiPaginated(@PathVariable("idD") Integer idD, Pageable pageable)
    {
        return  dogadjajService.getNeodabraniDogadjajiPaginated(idD, pageable);
    }
}
