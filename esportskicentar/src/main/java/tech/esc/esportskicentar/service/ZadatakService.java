package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.DogadjajStatsDTO;
import tech.esc.esportskicentar.model.Zadatak;
import tech.esc.esportskicentar.repository.ZadatakRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ZadatakService {

    private final ZadatakRepository zadatakRepository;
    private static LocalDate START_DATE_FOR_ALL = LocalDate.of(2000,1,1);
    @Autowired
    public ZadatakService(ZadatakRepository zadatakRepository){
        this.zadatakRepository = zadatakRepository;
    }
    public List<Zadatak> findAllZadataks(){
        return zadatakRepository.findAll();
    }

    public Zadatak findZadatakById(Integer id){
        return zadatakRepository.findById(id).orElse(null);
    }

    public Zadatak addZadatak(Zadatak zadatak){
        return  zadatakRepository.save(zadatak);
    }

    public Zadatak updateZadatak(Zadatak zadatak){
        Zadatak stariZadatak = zadatakRepository.findById(zadatak.getIdZadatak()).orElse(null);
        if(stariZadatak == null)
            return null;
        else
            return  zadatakRepository.save(zadatak);
    }

    public boolean deleteZadatak(Integer id){
        Optional<Zadatak> zadatak = zadatakRepository.findById(id);
        if(zadatak.isEmpty())
            return false;
        else {
            zadatakRepository.deleteById(id);
            return true;
        }
    }

    public Map<String, Integer> getZadatakStatsForPeriodManagedBy(String period, Integer userId) {
        Map<String, Integer> result = new HashMap<>();
        int numberOfFinishedTasks;
        int numberOfUnfinishedTasks;
        int numberOfExpiredUnfinishedTasks;

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
                startDate = START_DATE_FOR_ALL;
                break;
            default:
                throw new IllegalArgumentException("Invalid time range");
        }

        Date start = Date.valueOf(startDate);
        Date end = Date.valueOf(endDate);
        numberOfFinishedTasks = zadatakRepository.countByUpravnikIdUpravnikAndZavrsenTrueAndDatumKreiranjaBetween(userId, start, end);
        numberOfExpiredUnfinishedTasks = zadatakRepository.countByUpravnikIdUpravnikAndZavrsenFalseAndDatumKreiranjaBetweenAndRokIzvrsenjaBefore(userId, start, end, end);
        numberOfUnfinishedTasks = Math.abs(numberOfExpiredUnfinishedTasks - zadatakRepository.countByUpravnikIdUpravnikAndZavrsenFalseAndDatumKreiranjaBetween(userId, start, end));

        result.put("Urađeni zadaci", numberOfFinishedTasks);
        result.put("Neurađeni zadaci", numberOfUnfinishedTasks);
        result.put("Neurađeni zadaci s isteklim rokom", numberOfExpiredUnfinishedTasks);

        return result;
    }
}
