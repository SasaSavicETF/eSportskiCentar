package tech.esc.esportskicentar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.esc.esportskicentar.model.Dogadjaj;
import tech.esc.esportskicentar.repository.DogadjajRepository;

import java.util.List;
import java.util.Optional;

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

    public Dogadjaj updateDogadjaj(Dogadjaj dogadjaj){
        Dogadjaj stariDogadjaj = dogadjajRepository.findById(dogadjaj.getIdDogadjaj()).orElse(null);
        if(stariDogadjaj == null)
            return null;
        else
            return dogadjajRepository.save(dogadjaj);
    }

    public boolean deleteDogadjaj(Integer id){
        Optional<Dogadjaj> dogadjaj = dogadjajRepository.findById(id);
        if(dogadjaj.isEmpty())
            return false;
        else {
            dogadjajRepository.deleteById(id);
            return true;
        }
    }
}
