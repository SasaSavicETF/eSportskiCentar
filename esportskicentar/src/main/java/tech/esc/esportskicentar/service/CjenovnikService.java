package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Cjenovnik;
import tech.esc.esportskicentar.repository.CjenovnikRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CjenovnikService {

    private final CjenovnikRepository cjenovnikRepository;

    @Autowired
    public CjenovnikService(CjenovnikRepository cjenovnikRepository) {
        this.cjenovnikRepository = cjenovnikRepository;
    }

    public List<Cjenovnik> findAllCjenovniks() {
        return cjenovnikRepository.findAll();
    }

    public Cjenovnik findCjenovnikById(Integer id){
        return cjenovnikRepository.findById(id).orElse(null);
    }

    public Cjenovnik addCjenovnik(Cjenovnik cjenovnik){
        return cjenovnikRepository.save(cjenovnik);
    }

    public Cjenovnik updateCjenovnik(Cjenovnik cjenovnik){
        Cjenovnik stariCjenovnik = cjenovnikRepository.findById(cjenovnik.getIdCjenovnik()).orElse(null);
        if(stariCjenovnik == null)
            return null;
        else
            return cjenovnikRepository.save(cjenovnik);
    }

    public boolean deleteCjenovnik(Integer id){
        Optional<Cjenovnik> cjenovnik = cjenovnikRepository.findById(id);
        if(cjenovnik.isEmpty())
            return false;
        else {
            cjenovnikRepository.deleteById(id);
            return true;
        }
    }

    public List<Cjenovnik> findCjenovnikByTerenId(Integer terenId) {
        return cjenovnikRepository.findByTerenId(terenId);
    }

}
