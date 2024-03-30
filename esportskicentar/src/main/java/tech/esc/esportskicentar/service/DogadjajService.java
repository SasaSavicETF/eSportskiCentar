package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.repository.DogadjajRepository;

import java.util.List;

@Service
@Transactional
public class DogadjajService {

    private final DogadjajRepository dogadjajRepository;

    @Autowired
    public DogadjajService(DogadjajRepository dogadjajRepository){
        this.dogadjajRepository = dogadjajRepository;
    }

    public List<Dogadjaj> findAllDogadjajs(){
        return dogadjajRepository.findAll();
    }

    public Dogadjaj findDogadjajById(Integer id){
        return dogadjajRepository.findById(id).orElse(null);
    }

    public Dogadjaj addDogadjaj(Dogadjaj dogadjaj){
        return dogadjajRepository.save(dogadjaj);
    }

    public Dogadjaj updateDogadjaj(Integer id, Dogadjaj dogadjaj){
        Dogadjaj stariDogadjaj = dogadjajRepository.findById(id).orElse(null);
        if(stariDogadjaj == null || id != dogadjaj.getIdDogadjaj())
            return null;
        else
            return dogadjajRepository.save(dogadjaj);
    }

    public void deleteDogadjaj(Integer id){
        dogadjajRepository.deleteById(id);
    }
}
