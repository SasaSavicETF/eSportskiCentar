package tech.esc.esportskicentar.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.esc.esportskicentar.model.Sport;
import tech.esc.esportskicentar.repository.SportRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SportService {
    private final SportRepository sportRepository;
    @Autowired
    public SportService(SportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    public List<Sport> getAllSports(){
        return sportRepository.findAll();
    }

    public Sport getSportById(Integer id){
        return sportRepository.findById(id)
                .orElse(null);
    }

    public Sport createSport(Sport sport) {
        return sportRepository.save(sport);
    }

    public Sport updateSport(Sport newSport) {
        Sport sport = sportRepository.findById(newSport.getIdSport())
                .orElse(null);
        if (sport == null)
            return null;

        if (newSport.getNazivSporta() != null)
            sport.setNazivSporta(newSport.getNazivSporta());
        if (newSport.getDuzina() != null)
            sport.setDuzina(newSport.getDuzina());
        if (newSport.getSirina() != null)
            sport.setSirina(newSport.getSirina());
        if (newSport.getTipTerena() != null)
            sport.setTipTerena(newSport.getTipTerena());

        return sportRepository.save(sport);
    }

    public boolean deleteSport(Integer id) {
        Optional<Sport> sport = sportRepository.findById(id);
        if (sport.isEmpty())
            return false;
        else{
            sportRepository.deleteById(id);
            return true;
        }
    }

}
