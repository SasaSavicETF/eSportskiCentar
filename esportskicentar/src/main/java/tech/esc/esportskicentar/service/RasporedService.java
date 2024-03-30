package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Raspored;
import tech.esc.esportskicentar.repository.RasporedRepository;

import java.util.List;
@Service
@Transactional
public class RasporedService {

    private final RasporedRepository rasporedRepository;

    @Autowired
    public RasporedService(RasporedRepository rasporedRepository){
        this.rasporedRepository = rasporedRepository;
    }
    public List<Raspored> findAllRasporeds(){
        return rasporedRepository.findAll();
    }

    public Raspored findRasporedById(Integer id){
        return  rasporedRepository.findById(id).orElse(null);
    }

    public Raspored addRaspored(Raspored raspored){
        return rasporedRepository.save(raspored);
    }

    public Raspored updateRaspored(Integer id, Raspored raspored) {
        Raspored stariRaspored = rasporedRepository.findById(id).orElse(null);
        if(stariRaspored == null || id != raspored.getIdRaspored())
            return null;
        else
            return rasporedRepository.save(raspored);
    }

    public void deleteRaspored(Integer id){
        rasporedRepository.deleteById(id);
    }
}
