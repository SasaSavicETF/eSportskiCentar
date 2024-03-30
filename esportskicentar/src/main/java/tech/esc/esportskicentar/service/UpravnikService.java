package tech.esc.esportskicentar.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Upravnik;
import tech.esc.esportskicentar.repository.UpravnikRepository;

import java.util.List;

@Service
@Transactional
public class UpravnikService {

    private final UpravnikRepository upravnikRepository;

    public UpravnikService(UpravnikRepository upravnikRepository){
        this.upravnikRepository = upravnikRepository;
    }

    public List<Upravnik> findAllUpravniks() {
        return upravnikRepository.findAll();
    }

    public Upravnik findUpravnikById(Integer id){
        return upravnikRepository.findById(id).orElse(null);
    }

    public Upravnik addUpravnik(Upravnik upravnik){
        return upravnikRepository.save(upravnik);
    }

    public Upravnik updateUpravnik(Integer id, Upravnik upravnik){
        Upravnik stariUpravnik = upravnikRepository.findById(id).orElse(null);
        if(stariUpravnik == null || id != upravnik.getIdUpravnik())
            return null;
        else
            return upravnikRepository.save(upravnik);
    }

    public void deleteUpravnik(Integer id){
        upravnikRepository.deleteById(id);
    }

}
