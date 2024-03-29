package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Ekipa;
import tech.esc.esportskicentar.repository.EkipaRepository;
import tech.esc.esportskicentar.repository.SportRepository;
import tech.esc.esportskicentar.repository.TakmicenjeRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EkipaService {
    private final EkipaRepository ekipaRepository;
    private final SportRepository sportRepository;
    private final TakmicenjeRepository takmicenjeRepository;
    @Autowired
    public EkipaService(EkipaRepository ekipaRepository, SportRepository sportRepository, TakmicenjeRepository takmicenjeRepository) {
        this.ekipaRepository = ekipaRepository;
        this.sportRepository = sportRepository;
        this.takmicenjeRepository = takmicenjeRepository;
    }

    public List<Ekipa> getAllEkipe(){
        return ekipaRepository.findAll();
    }

    public Ekipa getEkipaById(Integer id){
        return ekipaRepository.findById(id)
                .orElse(null);
    }

    public Ekipa createEkipa(Ekipa ekipa) {
        ekipa.setSport(sportRepository.findById(ekipa.getSport().getIdSport()).orElse(null));
        ekipa.setTakmicenje(takmicenjeRepository.findById(ekipa.getTakmicenje().getIdTakmicenje()).orElse(null));
        return ekipaRepository.save(ekipa);
    }

    public Ekipa updateEkipa(Ekipa newEkipa, Integer id) {
        Ekipa ekipa = ekipaRepository.findById(id)
                .orElse(null);
        if (ekipa == null)
            return null;

        if (newEkipa.getNazivEkipe() != null)
            ekipa.setNazivEkipe(newEkipa.getNazivEkipe());
        if (newEkipa.getSport() != null)
            ekipa.setSport(sportRepository.findById(newEkipa.getSport().getIdSport())
                    .orElse(null));
        if (newEkipa.getTakmicenje() != null)
            ekipa.setTakmicenje(takmicenjeRepository.findById(newEkipa.getTakmicenje().getIdTakmicenje())
                    .orElse(null));

        return ekipaRepository.save(ekipa);
    }

    public boolean deleteEkipa(Integer id) {
        Optional<Ekipa> ekipa = ekipaRepository.findById(id);
        if (ekipa.isEmpty())
            return false;
        else{
            ekipaRepository.deleteById(id);
            return true;
        }
    }

}
