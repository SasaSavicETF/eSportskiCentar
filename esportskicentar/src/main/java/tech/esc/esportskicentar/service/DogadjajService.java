package tech.esc.esportskicentar.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.exception.UserNotFoundException;
import tech.esc.esportskicentar.model.*;
import tech.esc.esportskicentar.repository.*;
import tech.esc.esportskicentar.util.Util;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
//@Transactional
public class DogadjajService {

    private final DogadjajRepository dogadjajRepository;
    private final CjenovnikRepository cjenovnikRepository;
    private final DnevniRasporedRepository dnevniRasporedRepository;
    private final TransakcijaService transakcijaService;

    private final KlijentRepository klijentRepository;

    private final SportRepository sportRepository;
    private final DvoranaRepository dvoranaRepository;
    private static LocalDate START_DATE_FOR_ALL = LocalDate.of(2000,1,1);

    @Autowired
    public DogadjajService(DogadjajRepository dogadjajRepository, CjenovnikRepository cjenovnikRepository,
                           DnevniRasporedRepository dnevniRasporedRepository, KlijentRepository klijentRepository,
                           SportRepository sportRepository, DvoranaRepository dvoranaRepository)
                           TransakcijaService transakcijaService)
    {
        this.dogadjajRepository = dogadjajRepository;
        this.cjenovnikRepository = cjenovnikRepository;
        this.dnevniRasporedRepository = dnevniRasporedRepository;
        this.klijentRepository = klijentRepository;
        this.sportRepository = sportRepository;
        this.dvoranaRepository = dvoranaRepository;
        this.transakcijaService = transakcijaService;
    }

    public List<Dogadjaj> findAllDogadjajs(){
        return dogadjajRepository.findAll();
    }

    public List<Dogadjaj> findAllFilteredDogadjajs(Integer idDnevniR, Integer idTeren)
    {
        return dogadjajRepository.findAllFilteredDogadjajs(idDnevniR, idTeren).stream()
                .sorted(Comparator.comparing(Dogadjaj::getVrijemeOd))
                .collect(Collectors.toList());
    }

    public List<Dogadjaj> findAllDogadjajsOfUser(Integer id) {
        Klijent klijent = klijentRepository.findById(id).orElse(null);
        if(klijent != null)
            return dogadjajRepository.findByKlijentAndOdobrenTrue(klijent);
        else
            return null;
    }

    public Dogadjaj findDogadjajById(Integer id){
        return dogadjajRepository.findById(id).orElse(null);
    }

    public boolean vremenskiSukob(Dogadjaj dogadjaj)
    {
        if(dogadjaj.getVrijemeOd().compareTo(dogadjaj.getVrijemeDo()) >= 0)
        {
            System.out.println("1");
            return true;
        }
        List<Dogadjaj> dogadjajs = dogadjajRepository.findAll();
        int idDR = dogadjaj.getDnevniRaspored().getIdDnevniRaspored();
        Date dateDodgadjaj = dnevniRasporedRepository.findById(idDR).orElse(dogadjaj.getDnevniRaspored()).getDatum();
        for (Dogadjaj d : dogadjajs)
        {
            if(Util.equalsYearMonthDay(dateDodgadjaj, d.getDnevniRaspored().getDatum()) && d.isOdobren() && dogadjaj.getTeren().getIdTeren() == d.getTeren().getIdTeren())
            {
                if((dogadjaj.getVrijemeOd().compareTo(d.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeOd().compareTo(d.getVrijemeDo()) < 0) ||
                        (dogadjaj.getVrijemeDo().compareTo(d.getVrijemeOd()) > 0  && dogadjaj.getVrijemeDo().compareTo(d.getVrijemeDo()) <= 0))
                {
                    System.out.println("2");
                    return true;
                }
                else if( (dogadjaj.getVrijemeOd().compareTo(d.getVrijemeOd()) <= 0 && dogadjaj.getVrijemeOd().compareTo(d.getVrijemeDo()) < 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(d.getVrijemeOd()) > 0 && dogadjaj.getVrijemeDo().compareTo(d.getVrijemeDo()) >= 0) )
                {
                    System.out.println("3");
                    return true;
                }
            }
        }
        return false;
    }

    public Dogadjaj addDogadjaj(Dogadjaj dogadjaj)
    {
        //System.out.println(dogadjaj.getKlijent().getIdKlijent());
        if(dogadjaj.getSport() != null)
        {
            if(!dogadjaj.getSport().getTipTerena().getNazivTipaTerena().equals(dogadjaj.getTeren().getTipTerena().getNazivTipaTerena()))
            {
                System.out.println("0");
                throw new IllegalArgumentException("Događaj ima nepravilno unsesn sport");
            }
        }
        if(dogadjaj.getVrijemeOd().compareTo(dogadjaj.getVrijemeDo()) >= 0)
        {
            System.out.println("1");
            throw new IllegalArgumentException("Događaj ima nepravilno unsesno vrijeme");
        }
        List<Dogadjaj> dogadjajs = dogadjajRepository.findAll();
        int idDR = dogadjaj.getDnevniRaspored().getIdDnevniRaspored();
        Date dateDodgadjaj = dnevniRasporedRepository.findById(idDR).orElse(dogadjaj.getDnevniRaspored()).getDatum();
        for (Dogadjaj d : dogadjajs)
        {
            if(Util.equalsYearMonthDay(dateDodgadjaj, d.getDnevniRaspored().getDatum()) && d.isOdobren() && dogadjaj.getTeren().getIdTeren() == d.getTeren().getIdTeren())
            {
                if((dogadjaj.getVrijemeOd().compareTo(d.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeOd().compareTo(d.getVrijemeDo()) < 0) ||
                        (dogadjaj.getVrijemeDo().compareTo(d.getVrijemeOd()) > 0  && dogadjaj.getVrijemeDo().compareTo(d.getVrijemeDo()) <= 0))
                {
                    System.out.println("2");
                    throw new IllegalArgumentException("Događaj se ne može dodati zbog sukoba u vremenskim intervalima.");
                }
                else if( (dogadjaj.getVrijemeOd().compareTo(d.getVrijemeOd()) <= 0 && dogadjaj.getVrijemeOd().compareTo(d.getVrijemeDo()) < 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(d.getVrijemeOd()) > 0 && dogadjaj.getVrijemeDo().compareTo(d.getVrijemeDo()) >= 0) )
                {
                    System.out.println("3");
                    throw new IllegalArgumentException("Događaj se ne može dodati zbog sukoba u vremenskim intervalima.");
                }
            }
        }
        List<Cjenovnik> cjenovnici = cjenovnikRepository.findByTerenId(dogadjaj.getTeren().getIdTeren());
        List<Cjenovnik> cjenovnici2 = cjenovnikRepository.findByTerenId(dogadjaj.getTeren().getIdTeren());
        long vrijemeOdMillis = dogadjaj.getVrijemeOd().getTime();
        long vrijemeDoMillis = dogadjaj.getVrijemeDo().getTime();

        long diffMillis = vrijemeDoMillis - vrijemeOdMillis;
        double diffHours = 0.0;
        double cijena = 0.0;

        boolean kraj = false;
        for(Cjenovnik c : cjenovnici)
        {

            if(c.getTeren().getIdTeren() == dogadjaj.getTeren().getIdTeren())
            {
                if((dogadjaj.getVrijemeOd().compareTo(c.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeOd().compareTo(c.getVrijemeDo()) <= 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(c.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeDo().compareTo(c.getVrijemeDo()) <= 0))
                {

                        diffHours = ((double)diffMillis) / 3600000.0D;
                    cijena = diffHours * c.getCijena().doubleValue();
                }
                else if((dogadjaj.getVrijemeOd().compareTo(c.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeOd().compareTo(c.getVrijemeDo()) <= 0) &&
                        (dogadjaj.getVrijemeDo().compareTo(c.getVrijemeDo()) >= 0))
                {
                    boolean first = true;
                    boolean rad = false;

                    for(Cjenovnik temp : cjenovnici2)
                    {
                        if(!kraj && temp.getTeren().getIdTeren() == dogadjaj.getTeren().getIdTeren())
                        {
                            if((dogadjaj.getVrijemeOd().compareTo(temp.getVrijemeOd()) >= 0 && dogadjaj.getVrijemeOd().compareTo(temp.getVrijemeDo()) < 0)){
                                rad = true;
                            }
                            if(rad)
                            {
                                Time time = Time.valueOf("00:00:00");
                                if(first)
                                {
                                    diffMillis = temp.getVrijemeDo().getTime() - vrijemeOdMillis;
                                    diffHours = ((double)diffMillis) / 3600000.0D;
                                    cijena += diffHours * temp.getCijena().doubleValue();
                                    System.out.println("1." + cijena);
                                    first = false;
                                }
                                else if(!first && dogadjaj.getVrijemeDo().compareTo(temp.getVrijemeDo()) >= 0 && temp.getTeren().getIdTeren() == dogadjaj.getTeren().getIdTeren())
                                {
                                    if(temp.getVrijemeDo().equals(time))
                                    {
                                        System.out.println("AAAAAAAAAA");
                                        kraj = true;
                                        break;
                                    }
                                    diffMillis = temp.getVrijemeDo().getTime() - temp.getVrijemeOd().getTime();
                                    diffHours = ((double)diffMillis) / 3600000.0D;
                                    cijena += diffHours * temp.getCijena().doubleValue();
                                    System.out.println("2." + cijena);
                                    System.out.println(time.getTime());
                                }
                                else if(!first && dogadjaj.getVrijemeDo().compareTo(temp.getVrijemeDo()) <= 0)
                                {
                                    if(temp.getVrijemeDo().equals(time))
                                    {
                                        System.out.println("AAAAAAAAAA");
                                        kraj = true;
                                        break;
                                    }
                                    diffMillis = dogadjaj.getVrijemeDo().getTime() - temp.getVrijemeOd().getTime();
                                    diffHours = ((double)diffMillis) / 3600000.0D;
                                    cijena += diffHours * temp.getCijena().doubleValue();
                                    System.out.println("3." + cijena);
                                    kraj = true;
                                    if(temp.getVrijemeDo().equals(time))
                                    {
                                        kraj = true;
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        dogadjaj.setCijena(BigDecimal.valueOf(cijena));
        System.out.println(cijena);
        if(dogadjaj.isOdobren())
        {
            transakcijaService.createTransakcija(new Transakcija("Iznajmljivanje terena", true, BigDecimal.valueOf(cijena)));
        }
        return dogadjajRepository.save(dogadjaj);
    }

    public Dogadjaj updateDogadjaj(Dogadjaj dogadjaj){
        Dogadjaj stariDogadjaj = dogadjajRepository.findById(dogadjaj.getIdDogadjaj()).orElse(null);
        if(stariDogadjaj == null)
            return null;
        else
        {
            if(!stariDogadjaj.isOdobren() && dogadjaj.isOdobren())
            {
                transakcijaService.createTransakcija(new Transakcija("Iznajmljivanje terena", true, dogadjaj.getCijena()));
            }
            return dogadjajRepository.save(dogadjaj);
        }
    }

    public boolean deleteDogadjaj(Integer id){
        Optional<Dogadjaj> dogadjaj = dogadjajRepository.findById(id);
        if(dogadjaj.isEmpty())
            return false;
        else {
            if(dogadjaj.get().isOdobren())
            {
                transakcijaService.createTransakcija(new Transakcija("Otkazivanje iznajmljivanja terena", false, dogadjaj.get().getCijena()));
            }
            dogadjajRepository.deleteById(id);
            return true;
        }
    }

    public int getNumberOfDogadjajs() {
        return dogadjajRepository.countDogadjajs();
    }

    public List<DogadjajStatsDTO> findAllDogadjajsForPeriod(String period) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        return dogadjajRepository.findAllByDateRange(startDate, endDate)
                .stream().map(DogadjajStatsDTO::new).toList();
    }

    public int getNumberOfReservations() {
        return dogadjajRepository.countByOdobrenTrue();
    }

    public Map<String, Integer> getReservationStats() {
        Map<String, Integer> result = new HashMap<>();
        int numberOfClientsWithReservation = dogadjajRepository.countByDistinctClient();
        int numberOfClientsWithoutReservation = klijentRepository.countKlijents() - numberOfClientsWithReservation;

        result.put("Klijenti sa rezervacijama", numberOfClientsWithReservation);
        result.put("Klijenti bez rezervacija", numberOfClientsWithoutReservation);

        return result;
    }

    public List<DogadjajDTO> findWeeklyEvents(@NotNull int terenId, @NotBlank List<LocalDate> dates) {
        List<DogadjajDTO> weeklyEvents = new ArrayList<>();
        dates.forEach(date -> {
            List<Dogadjaj> temp = dogadjajRepository.findByTerenAndDate(terenId, date);
            temp.forEach(event -> {
                weeklyEvents.add(new DogadjajDTO(event));
            });
        });

        return weeklyEvents;
    }

    public List<ZaradaStatsDTO> getZaradaForPeriodByType(String period) {
        String groupByPattern = getGroupByPattern(period);
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        return dogadjajRepository.summarizeRevenueForPeriodByType(groupByPattern,startDate,endDate);
    }

    public Map<String, Integer> getZaradaForPeriodBySport(String period) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        Map<String, Integer> summary = new HashMap<>();
        List<Object[]> results = dogadjajRepository.summarizeRevenueForPeriodBySport(startDate,endDate);

        for (Object[] row : results) {
            String sport = (String) row[0];
            Integer total = ((Number) row[1]).intValue();
            summary.put(sport, total);
        }

        return summary;
    }

    public List<StatsDTO> getZaradaForPeriodForSport(String period, String sportName) {
        Sport sport = sportRepository.findByNazivSporta(sportName)
                .orElseThrow(() -> new UserNotFoundException("Sport with name " + sportName + " doesn't exist."));

        String groupByPattern = getGroupByPattern(period);
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        return dogadjajRepository.sumarizeRevenueForPeriodForSport(groupByPattern, startDate, endDate, sport.getIdSport());
    }

    public Map<String, Integer> getZaradaForPeriodByDvorana(String period) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        Map<String, Integer> summary = new HashMap<>();
        List<Object[]> results = dogadjajRepository.summarizeRevenueForPeriodByDvorana(startDate,endDate);

        for (Object[] row : results) {
            String dvorana = (String) row[0];
            Integer total = ((Number) row[1]).intValue();
            summary.put(dvorana, total);
        }

        return summary;
    }

    public List<StatsDTO> getZaradaForPeriodForDvorana(String period, String dvoranaName) {
        Dvorana dvorana = dvoranaRepository.findByNazivDvorane(dvoranaName)
                .orElseThrow(() -> new UserNotFoundException("Dvorana with name " + dvoranaName + " doesn't exist."));

        String groupByPattern = getGroupByPattern(period);
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = resolveStartDate(period, endDate);

        return dogadjajRepository.sumarizeRevenueForPeriodForDvorana(groupByPattern, startDate, endDate, dvorana.getIdDvorana());
    }

    private LocalDate resolveStartDate(String period, LocalDate endDate) {
        return switch (period.toLowerCase()) {
            case "last_seven_days" -> endDate.minusDays(6);
            case "this_month" -> endDate.with(TemporalAdjusters.firstDayOfMonth());
            case "this_year" -> endDate.with(TemporalAdjusters.firstDayOfYear());
            case "all" -> START_DATE_FOR_ALL;
            default -> throw new IllegalArgumentException("Invalid time range");
        };
    }

    private String getGroupByPattern(String period) {
        return switch (period.toLowerCase()) {
            case "last_seven_days", "this_month" -> "%Y-%m-%d";
            case "this_year" -> "%Y-%m-01";
            case "all" -> "%Y-01-01";
            default -> throw new IllegalArgumentException("Invalid time range");
        };
    }

    public Page<Dogadjaj> getNeodabraniDogadjajiPaginated(Integer dvoranaId, Pageable pageable)
    {
        return dogadjajRepository.findAllNeodobreniPaginated(dvoranaId, pageable);

    }
}
