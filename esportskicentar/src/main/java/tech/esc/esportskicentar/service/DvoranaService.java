package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.exception.UserNotFoundException;
import tech.esc.esportskicentar.model.*;
import tech.esc.esportskicentar.repository.DogadjajRepository;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.TerenRepository;
import tech.esc.esportskicentar.repository.UpravnikRepository;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class DvoranaService
{
    private final DvoranaRepository dvoranaRepository;
    private final UpravnikRepository upravnikRepository;
    private final TerenRepository terenRepository;
    private final DogadjajRepository dogadjajRepository;

    @Autowired
    public DvoranaService(DvoranaRepository dvoranaRepository, UpravnikRepository upravnikRepository
            , TerenRepository terenRepository, DogadjajRepository dogadjajRepository)
    {
        this.dvoranaRepository = dvoranaRepository;
        this.upravnikRepository = upravnikRepository;
        this.terenRepository = terenRepository;
        this.dogadjajRepository = dogadjajRepository;
    }

    public List<Dvorana> findAllDvoranas()
    {
        return dvoranaRepository.findAll();
    }

    public Dvorana addDvorana(Dvorana dvorana)
    {
        return dvoranaRepository.save(dvorana);
    }

    public Dvorana updateDvorana(Dvorana dvorana)
    {
        return dvoranaRepository.save(dvorana);
    }

    public Dvorana findDvoranaById(Integer id)
    {
        return dvoranaRepository.findDvoranaByIdDvorana(id).orElseThrow(() -> new UserNotFoundException("Dvorana by id " + id + " was not found"));
    }

    public void deleteDvorana(Integer id)
    {
        dvoranaRepository.deleteDvoranaByIdDvorana(id);
    }

    public int getNumberOfDvoranas() {
        return dvoranaRepository.countDvoranas();
    }

    public List<DogadjajStatsDTO> findAllDogadjajsManagedBy(String period, Integer userId) {
        Upravnik upravnik = upravnikRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Upravnik by id " + userId  + " was not found"));

        List<Teren> terensOfDvorana = terenRepository.findByDvoranaIdDvorana(upravnik.getDvorana().getIdDvorana());

        if(terensOfDvorana.isEmpty())
            throw new UserNotFoundException("No terens found for dvorana id " + upravnik.getDvorana().getIdDvorana());

        List<Integer> terensIds = terensOfDvorana.stream()
                .map(Teren::getIdTeren).toList();

        LocalDate startDate;
        LocalDate endDate = LocalDate.now();

        switch (period.toLowerCase()) {
            case "last_seven_days":
                startDate = endDate.minusDays(6);
                break;
            case "this_month":
                startDate = endDate.with(TemporalAdjusters.firstDayOfMonth());
                break;
            case "this_year":
                startDate = endDate.with(TemporalAdjusters.firstDayOfYear());
                break;
            case "all":
                return dogadjajRepository.findAllByTerenIdTerenIn(terensIds).stream().map(DogadjajStatsDTO::new).toList();
            default:
                throw new IllegalArgumentException("Invalid time range");
        }

            return dogadjajRepository.findAllByTerenIdTerenInAndDatumBetween(terensIds, startDate, endDate)
                    .stream().map(DogadjajStatsDTO::new).toList();

    }

    public String getNameOfDvoranaManagedBy(Integer userId) {
        Upravnik upravnik = upravnikRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Upravnik by id " + userId  + " was not found"));

        return upravnik.getDvorana().getNazivDvorane();
    }
}
