package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.DezurniRadnik;
import tech.esc.esportskicentar.repository.DezurniRadnikRepository;

import java.util.List;

@Service
@Transactional
public class DezurniRadnikService {

    private final DezurniRadnikRepository dezurniRadnikRepository;

    @Autowired
    public DezurniRadnikService(DezurniRadnikRepository dezurniRadnikRepository) {
        this.dezurniRadnikRepository = dezurniRadnikRepository;
    }

    public List<DezurniRadnik> findAllDezurniRadniks() {
        return dezurniRadnikRepository.findAll();
    }

    public DezurniRadnik findDezurniRadnikById(Integer id){
        return dezurniRadnikRepository.findById(id).orElse(null);
    }

    public DezurniRadnik addDezurniRadnik(DezurniRadnik dezurniRadnik){
        return dezurniRadnikRepository.save(dezurniRadnik);
    }

    public DezurniRadnik updateDezurniRadnik(Integer id, DezurniRadnik dezurniRadnik){
        DezurniRadnik stariDezurniRadnik = dezurniRadnikRepository.findById(id).orElse(null);
        if(stariDezurniRadnik == null || id != dezurniRadnik.getIdDezurniRadnik())
            return null;
        else
            return dezurniRadnikRepository.save(dezurniRadnik);
    }

    public void deleteDezurniRadnik(Integer id){
        dezurniRadnikRepository.deleteById(id);
    }


}
