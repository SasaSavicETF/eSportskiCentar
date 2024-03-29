package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.DnevniRaspored;
import tech.esc.esportskicentar.repository.DnevniRasporedRepository;

import java.util.List;

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
        return dnevniRasporedRepository.save(dnevniRaspored);
    }

    public void deleteDnevniRaspored(Integer id){
        dnevniRasporedRepository.deleteById(id);
    }
}
