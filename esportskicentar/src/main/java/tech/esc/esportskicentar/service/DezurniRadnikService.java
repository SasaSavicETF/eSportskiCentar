package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.DezurniRadnik;
import tech.esc.esportskicentar.repository.DezurniRadnikRepository;

import java.util.List;
import java.util.Optional;

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

    public DezurniRadnik updateDezurniRadnik(DezurniRadnik dezurniRadnik){
        DezurniRadnik stariDezurniRadnik = dezurniRadnikRepository.findById(dezurniRadnik.getIdDezurniRadnik()).orElse(null);
        if(stariDezurniRadnik == null)
            return null;
        else
            return dezurniRadnikRepository.save(dezurniRadnik);
    }

    public boolean deleteDezurniRadnik(Integer id){
        Optional<DezurniRadnik> dezurniRadnik = dezurniRadnikRepository.findById(id);
        if(dezurniRadnik.isEmpty())
            return false;
        else {
            dezurniRadnikRepository.deleteById(id);
            return true;
        }
    }


}
