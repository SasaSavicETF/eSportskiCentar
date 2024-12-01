package tech.esc.esportskicentar.controllers;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.esc.esportskicentar.model.*;
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

    @GetMapping("/revenue/for/{period}/byType")
    public ResponseEntity<List<ZaradaStatsDTO>> getZaradaForPeriodByType(@PathVariable("period") String period) {
        List<ZaradaStatsDTO> zarada = dogadjajService.getZaradaForPeriodByType(period);
        return new ResponseEntity<>(zarada, HttpStatus.OK);
    }

    @GetMapping("/revenue/for/{period}/bySport")
    public ResponseEntity<Map<String,Integer>> getZaradaForPeriodBySport(@PathVariable("period") String period) {
        Map<String,Integer> zaradaBySports = dogadjajService.getZaradaForPeriodBySport(period);
        return new ResponseEntity<>(zaradaBySports, HttpStatus.OK);
    }

    @GetMapping("/revenue/for/{period}/forSport/{sportName}")
    public ResponseEntity<List<StatsDTO>> getZaradaForPeriodForSport(@PathVariable("period") String period,
                                                                     @PathVariable("sportName") String sportName) {
        List<StatsDTO> zaradaForSport = dogadjajService.getZaradaForPeriodForSport(period, sportName);
        return new ResponseEntity<>(zaradaForSport, HttpStatus.OK);
    }

    @GetMapping("/revenue/for/{period}/byDvorana")
    public ResponseEntity<Map<String,Integer>> getZaradaForPeriodByDvorana(@PathVariable("period") String period) {
        Map<String,Integer> zaradaByDvoranas = dogadjajService.getZaradaForPeriodByDvorana(period);
        return new ResponseEntity<>(zaradaByDvoranas, HttpStatus.OK);
    }

    @GetMapping("/revenue/for/{period}/forDvorana/{dvoranaName}")
    public ResponseEntity<List<StatsDTO>> getZaradaForPeriodForDvorana(@PathVariable("period") String period,
                                                                     @PathVariable("dvoranaName") String dvoranaName) {
        List<StatsDTO> zaradaForDvorana = dogadjajService.getZaradaForPeriodForDvorana(period, dvoranaName);
        return new ResponseEntity<>(zaradaForDvorana, HttpStatus.OK);
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
}
