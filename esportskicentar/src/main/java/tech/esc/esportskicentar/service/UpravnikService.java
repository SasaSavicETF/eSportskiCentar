package tech.esc.esportskicentar.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.PaswordHasher;
import tech.esc.esportskicentar.model.Upravnik;
import tech.esc.esportskicentar.repository.DvoranaRepository;
import tech.esc.esportskicentar.repository.UpravnikRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UpravnikService {

    private final UpravnikRepository upravnikRepository;
    private final DvoranaRepository dvoranaRepository;

    private final PaswordHasher paswordHasher;

    public UpravnikService(UpravnikRepository upravnikRepository, DvoranaRepository dvoranaRepository, PaswordHasher paswordHasher)
    {
        this.upravnikRepository = upravnikRepository;
        this.dvoranaRepository = dvoranaRepository;
        this.paswordHasher = paswordHasher;
    }

    public List<Upravnik> findAllUpravniks() {
        return upravnikRepository.findAll();
    }

    public Upravnik findUpravnikById(Integer id){
        return upravnikRepository.findById(id).orElse(null);
    }

    public Upravnik addUpravnik(Upravnik upravnik)
    {
        upravnik.setLozinka(paswordHasher.hashPassword(upravnik.getLozinka()));
        upravnik.setDvorana(dvoranaRepository.findById(upravnik.getDvorana().getIdDvorana()).orElse(null));
        return upravnikRepository.save(upravnik);
    }
    
    public Upravnik updateUpravnik(Upravnik upravnik){
        Upravnik stariUpravnik = upravnikRepository.findById(upravnik.getIdUpravnik()).orElse(null);
        if(stariUpravnik == null)
            return null;
        else {
            //upravnik.setLozinka(paswordHasher.hashPassword(upravnik.getLozinka()));
            return upravnikRepository.save(upravnik);
        }
    }

    public boolean deleteUpravnik(Integer id){
        Optional<Upravnik> upravnik = upravnikRepository.findById(id);
        if(upravnik.isEmpty())
            return false;
        else {
            upravnikRepository.deleteById(id);
            return true;
        }
    }

}
