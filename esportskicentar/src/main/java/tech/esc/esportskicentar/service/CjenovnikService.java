package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.exception.UserNotFoundException;
import tech.esc.esportskicentar.model.Cjenovnik;
import tech.esc.esportskicentar.repository.CjenovnikRepository;

import java.util.List;

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
        return cjenovnikRepository.save(cjenovnik);
    }

    public void deleteCjenovnik(Integer id){
        cjenovnikRepository.deleteById(id);
    }

}
