package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.DnevniRaspored;
import tech.esc.esportskicentar.repository.DnevniRasporedRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DnevniRasporedService {

    private final DnevniRasporedRepository dnevniRasporedRepository;

    @Autowired
    public DnevniRasporedService(DnevniRasporedRepository dnevniRasporedRepository){
        this.dnevniRasporedRepository = dnevniRasporedRepository;
    }

    public List<DnevniRaspored> findAllDnevniRasporeds(){
        return dnevniRasporedRepository.findAll();
    }

    public DnevniRaspored findDnevniRasporedById(Integer id){
        return dnevniRasporedRepository.findById(id).orElse(null);
    }

    public DnevniRaspored addDnevniRaspored(DnevniRaspored dnevniRaspored){
        return dnevniRasporedRepository.save(dnevniRaspored);
    }

    public DnevniRaspored updateDnevniRaspored(DnevniRaspored dnevniRaspored){
        DnevniRaspored stariDnevniRaspored = dnevniRasporedRepository.findById(dnevniRaspored.getIdDnevniRaspored()).orElse(null);
        if(stariDnevniRaspored == null)
            return null;
        else
            return dnevniRasporedRepository.save(dnevniRaspored);
    }

    public boolean deleteDnevniRaspored(Integer id){
        Optional<DnevniRaspored> dnevniRaspored = dnevniRasporedRepository.findById(id);
        if(dnevniRaspored.isEmpty())
            return false;
        else {
            dnevniRasporedRepository.deleteById(id);
            return true;
        }
    }
}
