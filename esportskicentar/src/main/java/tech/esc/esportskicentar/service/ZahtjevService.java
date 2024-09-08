package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Zahtjev;
import tech.esc.esportskicentar.repository.DnevniRasporedRepository;
import tech.esc.esportskicentar.repository.KlijentRepository;
import tech.esc.esportskicentar.repository.TerenRepository;
import tech.esc.esportskicentar.repository.ZahtjevRepository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class ZahtjevService {
    private final ZahtjevRepository zahtjevRepository;
    private final KlijentRepository klijentRepository;
    private final TerenRepository terenRepository;
    private final DnevniRasporedRepository dnevniRasporedRepository;
    @Autowired
    public ZahtjevService(ZahtjevRepository zahtjevRepository, KlijentRepository klijentRepository, TerenRepository terenRepository, DnevniRasporedRepository dnevniRasporedRepository) {
        this.zahtjevRepository = zahtjevRepository;
        this.klijentRepository = klijentRepository;
        this.terenRepository = terenRepository;
        this.dnevniRasporedRepository = dnevniRasporedRepository;
    }

    public List<Zahtjev> getAllZahtjevs(){
        return zahtjevRepository.findAll();
    }

    public Zahtjev getZahtjevById(Integer id){
        Optional<Zahtjev> z = zahtjevRepository.findById(id);
        System.out.println(z.get().getVrijemeKraja());
        return zahtjevRepository.findById(id)
                .orElse(null);
    }

    public Zahtjev createZahtjev(Zahtjev zahtjev) {
        SimpleDateFormat format = new SimpleDateFormat("hh:mm dd.MM.yyyy.");
        Date date=null;
        try {
            date = format.parse("17:45 29.02.2024.");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        zahtjev.setVrijemeKraja(date);
        System.out.println(zahtjev.getVrijemeKraja());
        return zahtjevRepository.save(zahtjev);
    }

    public Zahtjev updateZahtjev(Zahtjev newZahtjev, Integer id) {
        Zahtjev zahtjev = zahtjevRepository.findById(id)
                .orElse(null);
        if (zahtjev == null)
            return null;

        if (newZahtjev.getVrijemePocetka() != null)
            zahtjev.setVrijemePocetka(newZahtjev.getVrijemePocetka());
        if (newZahtjev.getVrijemeKraja() != null)
            zahtjev.setVrijemeKraja(newZahtjev.getVrijemeKraja());
        if (newZahtjev.getPoruka() != null)
            zahtjev.setPoruka(newZahtjev.getPoruka());
        zahtjev.setOdobren(newZahtjev.isOdobren());
        if (newZahtjev.getKlijent() != null)
            zahtjev.setKlijent(klijentRepository.findById(newZahtjev.getKlijent().getIdKlijent())
                    .orElse(null));
        if (newZahtjev.getTeren() != null)
            zahtjev.setTeren(terenRepository.findById(newZahtjev.getTeren().getIdTeren())
                    .orElse(null));
        if (newZahtjev.getDnevniRaspored() != null)
            zahtjev.setDnevniRaspored(dnevniRasporedRepository.findById(newZahtjev.getDnevniRaspored().getIdDnevniRaspored())
                    .orElse(null));

        return zahtjevRepository.save(zahtjev);
    }

    public boolean deleteZahtjev(Integer id) {
        Optional<Zahtjev> zahtjev = zahtjevRepository.findById(id);
        if (zahtjev.isEmpty())
            return false;
        else{
            zahtjevRepository.deleteById(id);
            return true;
        }
    }

    public int getNumberOfZahtjevs() {
        return zahtjevRepository.countByOdobrenTrue();
    }

    public Map<String, Integer> getZahtjevStats() {
        Map<String, Integer> result = new HashMap<>();
        int numberOfClientsWithReservation = zahtjevRepository.countByDistinctClient();
        int numberOfClientsWithoutReservation = klijentRepository.countKlijents();

        result.put("Klijenti sa rezervacijama", numberOfClientsWithReservation);
        result.put("Klijenti bez rezervacija", numberOfClientsWithoutReservation);

        return result;
    }
}
