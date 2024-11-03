package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Cjenovnik;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.model.Klijent;
import tech.esc.esportskicentar.repository.CjenovnikRepository;
import tech.esc.esportskicentar.repository.DnevniRasporedRepository;
import tech.esc.esportskicentar.repository.DogadjajRepository;
import tech.esc.esportskicentar.repository.KlijentRepository;
import tech.esc.esportskicentar.util.Util;

import java.math.BigDecimal;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
//@Transactional
public class DogadjajService {

    private final DogadjajRepository dogadjajRepository;
    private final CjenovnikRepository cjenovnikRepository;
    private final DnevniRasporedRepository dnevniRasporedRepository;

    private final KlijentRepository klijentRepository;

    @Autowired
    public DogadjajService(DogadjajRepository dogadjajRepository, CjenovnikRepository cjenovnikRepository,
                           DnevniRasporedRepository dnevniRasporedRepository, KlijentRepository klijentRepository)
    {
        this.dogadjajRepository = dogadjajRepository;
        this.cjenovnikRepository = cjenovnikRepository;
        this.dnevniRasporedRepository = dnevniRasporedRepository;
        this.klijentRepository = klijentRepository;
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
        List<Cjenovnik> cjenovnici = cjenovnikRepository.findAll();
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

                    for(Cjenovnik temp : cjenovnici)
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
                                    if(temp.getVrijemeDo().equals(time))
                                    {

                                        kraj = true;
                                    }
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
        return dogadjajRepository.save(dogadjaj);
    }

    public Dogadjaj updateDogadjaj(Dogadjaj dogadjaj){
        Dogadjaj stariDogadjaj = dogadjajRepository.findById(dogadjaj.getIdDogadjaj()).orElse(null);
        if(stariDogadjaj == null)
            return null;
        else
            return dogadjajRepository.save(dogadjaj);
    }

    public boolean deleteDogadjaj(Integer id){
        Optional<Dogadjaj> dogadjaj = dogadjajRepository.findById(id);
        if(dogadjaj.isEmpty())
            return false;
        else {
            dogadjajRepository.deleteById(id);
            return true;
        }
    }

    public int getNumberOfDogadjajs() {
        return dogadjajRepository.countDogadjajs();
    }

    public List<Dogadjaj> findAllDogadjajsForPeriod(String period) {
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
                return dogadjajRepository.findAll();
            default:
                throw new IllegalArgumentException("Invalid time range");
        }

        return dogadjajRepository.findAllByDateRange(startDate, endDate);
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
}
